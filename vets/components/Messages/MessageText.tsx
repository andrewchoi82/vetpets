"use client";
import Image from "next/image";
import React, { useEffect, useState, KeyboardEvent, useRef } from 'react'
import { supabase } from '@/app/lib/supabaseClient';
import { getImageUrl as getStorageImageUrl } from '@/app/lib/supabaseGetImage';
import { getFileUrl as getStorageFileUrl } from '@/app/lib/supabaseGetFile';
import { uploadImage, uploadDocument } from '@/app/lib/supabaseUpload';
import Cookies from 'js-cookie';


interface MessageTextProp {
    convoID: number;
    onCreateConversation?: (message: string) => Promise<void>;
    isNewConversation?: boolean;
    subject?: string;
    setSubject?: (subject: string) => void;
}

//takes in prop of the setpagestate from page.tsx of message to change which modal is rendered
export default function MessageText({ convoID, onCreateConversation, isNewConversation, subject, setSubject }: MessageTextProp) {


    interface Conversation {
        convoId: number;
        name: string;
        lastMessageTime: string;
        petId: number;
        numUnreadMessages: number | null;
        numUnreadDoctor: number | null;
        doctorId: string;
        userId: string;

    }

    interface Message {
        messageId: number;
        convoId: number;
        senderId: string;
        receiverId: string;
        type: string;
        content: string | null;
        filename: string | null;
        filetype: string | null;
        createdAt: string; // Format: 2025-04-01 12:05:00+00
    };

    interface User {
        id: string;  // uuid type
        userType: number;  // smallint type
        firstName: string | null;
        lastName: string | null;
        birthdate: string | null;  // date will come as string
        sex: string | null;
        phoneNumber: number | null;  // bigint type
        email: string | null;
        contactPreference: string | null;
        address: string | null;
        username: string | null;
        profilePic: string | null;
    }

    const [convoData, setConvoData] = useState<Conversation | null>(null);

    const [messageData, setMessageData] = useState<Message[]>([]);
    const [sendingMessage, setSendingMessage] = useState("");
    const [pendingFiles, setPendingFiles] = useState<File[]>([]);
    const [pendingImages, setPendingImages] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [isSubjectEditable, setIsSubjectEditable] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const currId = Cookies.get('userId');
    const petId = Cookies.get('petId');
    const [chattingToId, setChattingToId] = useState("");
    const [otherEndUserData, setOtherEndUserData] = useState<User | null>(null);
    

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Fetch initial messages
    useEffect(() => {
        const fetchConvoAndID = async () => {
            try {
                const res = await fetch(`/api/conversations/byId?convoId=${convoID}`);
                const data = await res.json();
                setConvoData(data);

                let otherEndId;
                if(data.userId === currId){
                    otherEndId = data.doctorId;
                }
                else{
                    otherEndId = data.userId;
                }
                setChattingToId(otherEndId);

                const res1 = await fetch(`/api/me?userId=${otherEndId}`, {
                    method: 'GET',
                });
                const user = await res1.json();
                setOtherEndUserData(user);

                if (user) {
                    await fetch('/api/conversations/clearNotification', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            convoId: convoID,
                            sentByUser: user.userType === 1
                        }),
                    });
                }
            }
            catch (error) {
                console.error('Error fetching messages:', error);
                setConvoData(null);
                setOtherEndUserData(null);
            }
        };
        fetchConvoAndID();



        const fetchMessages = async () => {
            try {
                const response = await fetch(`/api/messages?convoId=${convoID}`);
                const data = await response.json();
                if (Array.isArray(data)) {
                    setMessageData(data);
                    setTimeout(scrollToBottom, 100);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
                // Fallback to sample data
                setMessageData([]);
            }
        };

        if (convoID === -2) {
            setMessageData([]);
        } else {
            fetchMessages();
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

    // Add this useEffect to scroll on new messages
    useEffect(() => {
        scrollToBottom();
    }, [messageData]);

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPendingFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
        }
    };

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setPendingImages(prev => [...prev, ...Array.from(e.target.files || [])]);
        }
    };

    const handleSubmit = async () => {
        if (!sendingMessage.trim() && pendingFiles.length === 0 && pendingImages.length === 0) return;

        const messageToSend = sendingMessage;
        const imagesToUpload = [...pendingImages];
        const filesToUpload = [...pendingFiles];

        setSendingMessage("");
        setPendingFiles([]);
        setPendingImages([]);
        setIsUploading(true);

        try {
            if (isNewConversation && onCreateConversation) {
                await onCreateConversation(messageToSend);
                return;
            }

            // Handle text message
            if (messageToSend.trim()) {
                const textMessage = {
                    convoId: convoID,
                    senderId: currId,
                    receiverId: chattingToId,
                    type: "text",
                    content: messageToSend,
                    filename: null,
                    filetype: null,
                    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + '+00'
                };

                await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(textMessage)
                });

                if (otherEndUserData) {
                    // Then update notifications
                    await fetch('/api/conversations/addNotification', {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ 
                            convoId: convoID,
                            sentByUser: otherEndUserData.userType === 1
                        }),
                    });
                }
            }

            // Handle pending images using uploadImage
            for (const image of imagesToUpload) {
                const fileName = await uploadImage(image);
                if (fileName) {
                    const imageMessage = {
                        convoId: convoID,
                        senderId: currId,
                        receiverId: chattingToId,
                        type: "image",
                        content: image.name,
                        filename: fileName,
                        filetype: image.type,
                        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + '+00'
                    };

                    await fetch('/api/messages', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(imageMessage)
                    });

                    if (otherEndUserData) {
                        // First update the conversation's lastMessageTime in the database
                        await fetch('/api/conversations/updateLastMessageTime', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                convoId: convoID,
                                lastMessageTime: new Date().toISOString()
                            }),
                        });

                        // Then update notifications
                        await fetch('/api/conversations/addNotification', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                convoId: convoID,
                                sentByUser: otherEndUserData.userType === 1
                            }),
                        });
                    }
                }
            }

            // Handle pending files using uploadDocument
            for (const file of filesToUpload) {
                const fileName = await uploadDocument(file);
                if (fileName) {
                    const fileMessage = {
                        convoId: convoID,
                        senderId: currId,
                        receiverId: chattingToId,
                        type: "file",
                        content: file.name,
                        filename: fileName,
                        filetype: file.type,
                        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 19) + '+00'
                    };

                    await fetch('/api/messages', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(fileMessage)
                    });

                    if (otherEndUserData) {
                        // First update the conversation's lastMessageTime in the database
                        await fetch('/api/conversations/updateLastMessageTime', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                convoId: convoID,
                                lastMessageTime: new Date().toISOString()
                            }),
                        });

                        // Then update notifications
                        await fetch('/api/conversations/addNotification', {
                            method: 'PATCH',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ 
                                convoId: convoID,
                                sentByUser: otherEndUserData.userType === 1
                            }),
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsUploading(false);
        }
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    // Format date for timestamp display
    const formatMessageDate = (dateString: string) => {
        const messageDate = new Date(dateString);
        const now = new Date();
        const isToday = messageDate.toDateString() === now.toDateString();
        const isYesterday = new Date(now.setDate(now.getDate() - 1)).toDateString() === messageDate.toDateString();
        
        // Format time (e.g., "2:30 PM")
        const timeOptions: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: '2-digit', hour12: true };
        const timeStr = messageDate.toLocaleTimeString(undefined, timeOptions);
        
        if (isToday) {
            return timeStr;
        } else if (isYesterday) {
            return `Yesterday, ${timeStr}`;
        } else {
            // Format date (e.g., "Jan 15, 2:30 PM")
            const dateOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
            const dateStr = messageDate.toLocaleDateString(undefined, dateOptions);
            return `${dateStr}, ${timeStr}`;
        }
    };

    // Check if we should show timestamp between messages
    const shouldShowTimestamp = (currentMsg: Message, prevMsg: Message | null) => {
        if (!prevMsg) return true; // Always show for first message
        
        const currentTime = new Date(currentMsg.createdAt).getTime();
        const prevTime = new Date(prevMsg.createdAt).getTime();
        
        // Show timestamp if messages are more than 30 minutes apart
        return (currentTime - prevTime) > 30 * 60 * 1000;
    };

    return (
        <main className="w-full h-full flex flex-col overflow-hidden">
            {!isNewConversation && (
                <div className="w-full flex flex-row justify-between items-center h-[60px] border-b-[1px] border-solid border-[#DFDFDF] px-4 flex-shrink-0">
                    <div className="ml-3 flex flex-col w-[200px]">
                        <div className="text-[#919191]">
                            To: {otherEndUserData && (
                                otherEndUserData.userType === 1 
                                    ? `${otherEndUserData.firstName} ${otherEndUserData.lastName}`
                                    : otherEndUserData.userType === 2 
                                        ? `Dr. ${otherEndUserData.lastName}`
                                        : otherEndUserData.lastName
                            )}
                        </div>
                        <div className="text-[#4C4C4C]">
                            {"Subject: " + convoData?.name}
                        </div>
                    </div>

                    <Image
                        src="/img/message/write.svg"
                        alt="Message image"
                        width={25}
                        height={20}
                        className="mr-3 h-auto max-w-[25px]"
                    />
                </div>
            )}
            <div className="flex-1 overflow-y-auto px-3 relative scroll-smooth">
                <div className="flex flex-col gap-4 pb-[80px] pt-2">
                    {messageData.map((message, index) => {
                        const prevMessage = index > 0 ? messageData[index - 1] : null;
                        const showTimestamp = shouldShowTimestamp(message, prevMessage);
                        
                        return (
                            <React.Fragment key={`${message.messageId}-${index}`}>
                                {showTimestamp && (
                                    <div className="flex justify-center my-2">
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                            {formatMessageDate(message.createdAt)}
                                        </span>
                                    </div>
                                )}
                                <div
                                    className={`flex ${message.senderId === currId ? 'justify-end pr-2' : 'justify-start pl-2'}`}
                                >
                                    <div
                                        className={`max-w-[90%] md:max-w-[70%] rounded-lg p-3 ${
                                            message.senderId === currId
                                                ? message.type === 'text' ? 'bg-[#004D81] text-white' : ''
                                                : message.type === 'text' ? 'bg-[#DFDFDF] text-[#4C4C4C]' : ''
                                        }`}
                                    >
                                        {message.type === 'text' && (
                                            <p className="break-words text-sm md:text-base">{message.content}</p>
                                        )}
                                        {message.type === 'image' && (
                                            <div className={`${message.senderId === currId ? 'flex justify-end' : ''}`}>
                                                <Image
                                                    src={message.filename ? getStorageImageUrl(message.filename) : "https://xyjhjcgojsrwopmwxmiy.supabase.co/storage/v1/object/public/images//bear"}
                                                    alt="Message image"
                                                    width={300}
                                                    height={200}
                                                    className="rounded-lg w-full h-auto max-w-[300px]"
                                                />
                                            </div>
                                        )}
                                        {message.type === 'file' && (
                                            <div className={`flex items-center gap-2 p-3 rounded-lg ${message.senderId === currId ? 'bg-[#EBF5FF] border border-[#CCEAFF]' : 'bg-[#F5F5F5] border border-[#E0E0E0]'}`}>
                                                <div className="flex-shrink-0">
                                                    <Image
                                                        src="/img/message/messageAttach.svg"
                                                        alt="File attachment"
                                                        width={24}
                                                        height={24}
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <div className="flex flex-col flex-1 min-w-0">
                                                    <a 
                                                        href={message.filename ? getStorageFileUrl(message.filename) : "#"} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className={`text-sm md:text-base font-medium truncate hover:underline transition-colors ${message.senderId === currId ? "text-[#004D81] hover:text-blue-700" : "text-[#4C4C4C] hover:text-blue-600"}`}
                                                    >
                                                        {message.content || message.filename}
                                                    </a>
                                                    <span className="text-xs text-gray-500 truncate">
                                                        {message.filetype && `${message.filetype.toUpperCase()} file`}
                                                    </span>
                                                </div>
                                                
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </React.Fragment>
                        );
                    })}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            
            <div className="w-full bg-white border-t border-gray-100 pt-2 px-2">
                {isUploading && (
                    <div className="text-right text-sm text-gray-500 pr-4 pb-2">
                        Sending...
                    </div>
                )}
                {(pendingImages.length > 0 || pendingFiles.length > 0) && (
                    <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg mb-2">
                        {pendingImages.map((img, idx) => (
                            <div key={idx} className="relative w-12 md:w-16 h-12 md:h-16">
                                <Image
                                    src={URL.createObjectURL(img)}
                                    alt="Preview"
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>
                        ))}
                        {pendingFiles.map((file, idx) => (
                            <div key={idx} className="flex items-center gap-1 bg-white p-1 rounded">
                                <Image
                                    src="/img/message/messageAttach.svg"
                                    alt="File"
                                    width={16}
                                    height={16}
                                />
                                <span className="text-xs md:text-sm truncate max-w-[80px] md:max-w-[100px]">{file.name}</span>
                            </div>
                        ))}
                    </div>
                )}

                <div className="flex items-center gap-2 p-2.5 bg-white">
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleChangeImage}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            multiple
                        />
                        <div className="flex items-center justify-center w-8 md:w-10 h-8 md:h-10 rounded-lg cursor-pointer hover:bg-gray-50">
                            <Image
                                src="/img/message/messageImage.svg"
                                alt="Add image"
                                width={20}
                                height={20}
                                className="w-4 md:w-5 h-4 md:h-5 cursor-pointer"
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type="file"
                            accept="image/*,
                                        video/*,
                                        audio/*,
                                        application/pdf,
                                        application/msword,
                                        application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                                        application/vnd.ms-excel,
                                        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                                        text/plain,
                                        application/zip,
                                        application/json
                                     "
                            onChange={handleChangeFile}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            multiple
                        />
                        <div className="flex items-center justify-center w-8 md:w-10 h-8 md:h-10 rounded-lg cursor-pointer hover:bg-gray-50">
                            <Image
                                src="/img/message/messageAttach.svg"
                                alt="Add file"
                                width={20}
                                height={20}
                                className="w-4 md:w-5 h-4 md:h-5 cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="flex flex-1 items-center bg-white rounded-[100px] p-2 shadow">
                        <input
                            type="text"
                            value={sendingMessage}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSendingMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Type a message..."
                            className="flex-1 border-none outline-none px-3 py-2 text-sm md:text-base"
                        />

                        <div
                            className="flex items-center justify-center w-8 md:w-10 h-8 md:h-10 rounded-lg cursor-pointer hover:bg-gray-50"
                            onClick={handleSubmit}
                        >
                            <Image
                                src="/img/message/messageSend.svg"
                                alt="Send message"
                                width={20}
                                height={20}
                                className="w-4 md:w-5 h-4 md:h-5"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}