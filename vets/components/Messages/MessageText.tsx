"use client";
import Image from "next/image";
import React, { useEffect, useState, KeyboardEvent } from 'react'

import { SideBarContainer } from "@/components/MainSideBar/SideBarContainer";
import DashboardRecentTestBox from "@/components/Dashboard/dashboardRecentTestBox"
import DashboardBillingBox from "@/components/Dashboard/dashboardBillingBox"
import DashboardMessagesBox from "@/components/Dashboard/dashboardMessagesBox"
import DashboardAppointmentsBox from "@/components/Dashboard/dashboardAppointmentsBox"
import DashboardSmallBox from "@/components/Dashboard/dashboardSmallBox"
import { MessageHeaderBox } from "./MessageHeaderBox";
import { MessageMain } from "./MessageMain";

interface MessageTextProp {
    convoID: number;
}

//takes in prop of the setpagestate from page.tsx of message to change which modal is rendered
export default function MessageText({ convoID }: MessageTextProp) {


    interface Message {
        messageId: number; // unique ID
        chatId: number; // which conversation this belongs to
        senderId: number;
        receiverId: number;
        type: "text" | "image" | "file";
        content: string; // actual message (text OR file URL)
        fileName?: string; // for files/images
        fileType?: string; // e.g., 'image/png', 'application/pdf'
        createdAt: string;
    };



    const sampMessage: Message[] = [
       
        {
            messageId: 2,
            chatId: 1,
            senderId: 2,
            receiverId: 1,
            type: "text",
            content: "Hi What do you need help with",
            fileName: "",
            fileType: "",
            createdAt: "2025-04-01T05:38:15"
        },
        {
            messageId: 3,
            chatId: 1,
            senderId: 1,
            receiverId: 2,
            type: "text",
            content: "I think my dog is dead",
            fileName: "",
            fileType: "",
            createdAt: "2025-04-01T05:38:15"
        },
        {
            messageId: 4,
            chatId: 1,
            senderId: 1,
            receiverId: 2,
            type: "image",
            content: "",
            fileName: "/img/message/bear.png",
            fileType: ".png",
            createdAt: "2025-04-01T05:38:15"
        },
        {
            messageId: 5, // Changed from 4 to 5 to ensure unique IDs
            chatId: 1,
            senderId: 2,
            receiverId: 1,
            type: "text",
            content: "TYPEE SHIIIITTTT",
            fileName: "",
            fileType: "",
            createdAt: "2025-04-01T05:38:15"
        }
    ];

    const randomData: Message[] = [
        {
            messageId: 7,
            chatId: 1,
            senderId: 2,
            receiverId: 1,
            type: "text",
            content: "Based on the symptoms you described, it's possible that Snowball has an ear infection or irritation. I recommend bringing them in for an exam so we can properly assess the ear and determine if medication is needed.",
            fileName: "",
            fileType: "",
            createdAt: "2025-04-01T05:38:15"
        },
        {
            messageId: 8,
            chatId: 1,
            senderId: 2,
            receiverId: 1,
            type: "text",
            content: "Type Shit",
            fileName: "",
            fileType: "",
            createdAt: "2025-04-01T05:38:15"
        },
        {
            messageId: 9,
            chatId: 1,
            senderId: 2,
            receiverId: 1,
            type: "text",
            content: "No",
            fileName: "",
            fileType: "",
            createdAt: "2025-04-01T05:38:15"
        },
        {
            messageId: 10,
            chatId: 1,
            senderId: 2,
            receiverId: 1,
            type: "text",
            content: "Can you explain the situation in more detail?",
            fileName: "",
            fileType: "",
            createdAt: "2025-04-01T05:38:15"
        },
        {
            messageId: 11,
            chatId: 1,
            senderId: 2,
            receiverId: 1,
            type: "text",
            content: "Let me ask CHATGPT. Please be on hold for 2 minutes",
            fileName: "",
            fileType: "",
            createdAt: "2025-04-01T05:38:15"
        },
    ];



    const [messageData, setMessageData] = useState<Message[]>([]);

    const [sendingMessage, setSendingMessage] = useState("");
    const [pendingFiles, setPendingFiles] = useState<File[]>([]);
    const [pendingImages, setPendingImages] = useState<File[]>([]);



    //this currently sets the sample appointment data to the state
    //change this later to add API to get real data
    useEffect(() => {
        if(convoID!=-2){
            setMessageData(sampMessage);
        }
    }, []);

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

    const handleSubmit = () => {
        const newMessages: Message[] = [];
        const lastId = messageData.length > 0 ? Math.max(...messageData.map(m => m.messageId)) : 0;
        let currentId = lastId + 1;

        // Add text message if exists
        if (sendingMessage.trim()) {
            newMessages.push({
                messageId: currentId++,
                chatId: 1,
                senderId: 1,
                receiverId: 2,
                type: "text",
                content: sendingMessage,
                fileName: "",
                fileType: "",
                createdAt: new Date().toISOString()
            });
        }

        // Add image messages
        pendingImages.forEach(image => {
            newMessages.push({
                messageId: currentId++,
                chatId: 1,
                senderId: 1,
                receiverId: 2,
                type: "image",
                content: "",
                fileName: `/img/message/${image.name}`, // Store with proper path
                fileType: image.type,
                createdAt: new Date().toISOString()
            });
        });

        // Add file messages
        pendingFiles.forEach(file => {
            newMessages.push({
                messageId: currentId++,
                chatId: 1,
                senderId: 1,
                receiverId: 2,
                type: "file",
                content: "",
                fileName: file.name,
                fileType: file.type,
                createdAt: new Date().toISOString()
            });
        });

        // Update state with user messages
        setMessageData(prev => [...prev, ...newMessages]);

        // Add random response from randomData after 2 seconds
        if (newMessages.length > 0) {
            setTimeout(() => {
                const randomIndex = Math.floor(Math.random() * randomData.length);
                const randomResponse = {
                    ...randomData[randomIndex],
                    messageId: currentId + 1
                };
                setMessageData(prev => [...prev, randomResponse]);
            }, 2000);
        }

        setSendingMessage("");
        setPendingFiles([]);
        setPendingImages([]);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <main className="w-full h-full flex flex-col overflow-hidden">
            <div className="w-full flex flex-row justify-between items-center h-[60px] border-b-[1px] border-solid border-[#DFDFDF] px-4 flex-shrink-0">
                <div className="ml-3 flex flex-col w-[200px]">
                    <div className="text-[#919191]">
                    To: Dr. Sarah
                    </div>
                    <div className="text-[#4C4C4C]">
                        Subject: Pontential
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

            <div className="flex-1 overflow-y-auto px-3 relative">
                <div className="flex flex-col gap-4 pb-[80px] pt-2">
                    {messageData.map((message, index) => (
                        <div
                            key={`${message.messageId}-${index}`}
                            className={`flex ${message.senderId === 1 ? 'justify-end pr-2' : 'justify-start pl-2'}`}
                        >
                            <div
                                className={`max-w-[90%] md:max-w-[70%] rounded-lg p-3 ${message.senderId === 1
                                    ? message.type === 'text' ? 'bg-[#004D81] text-white' : ''
                                    : message.type === 'text' ? 'bg-[#DFDFDF] text-[##4C4C4C]' : ''
                                    }`}
                            >
                                {message.type === 'text' && (
                                    <p className="break-words text-sm md:text-base">{message.content}</p>
                                )}
                                {message.type === 'image' && (
                                    <div className={`${message.senderId === 1 ? 'flex justify-end' : ''}`}>
                                        <Image
                                            src={message.fileName || ""}
                                            alt="Message image"
                                            width={300}
                                            height={200}
                                            className="rounded-lg w-full h-auto max-w-[300px]"
                                        />
                                    </div>
                                )}
                                {message.type === 'file' && (
                                    <div className="flex items-center gap-2">
                                        <Image
                                            src="/img/message/messageAttach.svg"
                                            alt="File attachment"
                                            width={20}
                                            height={20}
                                        />
                                        <span className="text-sm md:text-base truncate">{message.fileName}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            <div className="w-full bg-white border-t border-gray-100 pt-2 px-2">
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
                                className="w-4 md:w-5 h-4 md:h-5"
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
                                className="w-4 md:w-5 h-4 md:h-5"
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
