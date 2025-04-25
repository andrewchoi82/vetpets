"use client";
import Image from "next/image";
import React, { useEffect, useState, KeyboardEvent } from 'react';
import { supabase } from '@/app/lib/supabaseClient';

interface Message {
    messageId: number;
    convoId: string;
    senderId: string;
    receiverId: string;
    type: "text" | "image" | "file";
    content: string;
    filename?: string;
    filetype?: string;
    createdAt: string;
    read: boolean;
}

interface MessageTextProp {
    convoID: number;
}

export default function MessageText({ convoID }: MessageTextProp) {
    const [messageData, setMessageData] = useState<Message[]>([]);
    const [sendingMessage, setSendingMessage] = useState("");
    const [pendingFiles, setPendingFiles] = useState<File[]>([]);
    const [pendingImages, setPendingImages] = useState<File[]>([]);

    // Fetch initial messages
    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch(`/api/messages?convoId=${convoID}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setMessageData(data);
            }
        };

        if (convoID !== -2) {
            fetchMessages();
        } else {
            setMessageData([]);
        }
    }, [convoID]);

    // Set up realtime subscription
    useEffect(() => {
        if (convoID === -2) return;

        const channel = supabase
            .channel(`messages_${convoID}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'message',
                    filter: `convoId=eq.${convoID}`
                },
                (payload) => {
                    setMessageData(prev => [...prev, payload.new as Message]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [convoID]);

    const handleSubmit = async () => {
        if (!sendingMessage.trim() && pendingFiles.length === 0 && pendingImages.length === 0) return;

        try {
            // Handle text message
            if (sendingMessage.trim()) {
                const textMessage = {
                    convoId: convoID.toString(),
                    senderId: "1", // Replace with actual user ID
                    receiverId: "2", // Replace with actual receiver ID
                    type: "text" as const,
                    content: sendingMessage,
                    filename: "",
                    filetype: "",
                    read: false
                };

                await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(textMessage)
                });
            }

            // Handle pending files
            for (const file of pendingFiles) {
                const fileMessage = {
                    convoId: convoID.toString(),
                    senderId: "1", // Replace with actual user ID
                    receiverId: "2", // Replace with actual receiver ID
                    type: "file" as const,
                    content: "", // You might want to store file URL here
                    filename: file.name,
                    filetype: file.type,
                    read: false
                };

                await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(fileMessage)
                });
            }

            // Handle pending images
            for (const image of pendingImages) {
                const imageMessage = {
                    convoId: convoID.toString(),
                    senderId: "1", // Replace with actual user ID
                    receiverId: "2", // Replace with actual receiver ID
                    type: "image" as const,
                    content: "", // You might want to store image URL here
                    filename: image.name,
                    filetype: image.type,
                    read: false
                };

                await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(imageMessage)
                });
            }

            // Reset states
            setSendingMessage("");
            setPendingFiles([]);
            setPendingImages([]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    // Rest of your component remains the same (handleKeyPress, render logic, etc.)
    // ... existing render code ...
} 