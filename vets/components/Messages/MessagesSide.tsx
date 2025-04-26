"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import { getImageUrl as getStorageImageUrl } from '@/app/lib/supabaseGetImage';


import MessageText from "./MessageText";
import Cookies from 'js-cookie';


interface MessageOverviewProps {
    setPageState: React.Dispatch<React.SetStateAction<
        | { view: 'overview' }
        | { view: 'create' }
        | { view: 'texting'; conversationId: number }
    >>;
}

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

//takes in prop of the setpagestate from page.tsx of message to change which modal is rendered
export default function MessagesSide({ setPageState }: MessageOverviewProps) {

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

    const [messageData, setMessageData] = useState<Conversation[]>([]);
    const [convoNum, setConvoNum] = useState(-1);
    const [onMessage, setOnMessage] = useState(false);
    const [chattingToId, setChattingToId] = useState("");

    const [otherEndUserData, setOtherEndUserData] = useState<User | null>(null);

    const currId = Cookies.get('userId');
    const petId = Cookies.get('petId');


    //this currently sets the sample appointment data to the state
    //change this later to add API to get real data
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/conversations?petId=${petId}`);
                const data = await res.json();
                setMessageData(data);
                let otherEndId;

                //we just get the opposing texter info from the first item
                if (data && data.length > 0) {
                    if (data[0].userId === currId) {
                        otherEndId = data[0].doctorId;
                    }
                    else {
                        otherEndId = data[0].userId;
                    }
                    setChattingToId(otherEndId);
                    const res1 = await fetch(`/api/me?userId=${otherEndId}`, {
                        method: 'GET',
                    });
                    const user = await res1.json();
                    setOtherEndUserData(user);
                }
            }
            catch (error) {
                console.error('Error fetching messages:', error);
                setMessageData([]);
                setOtherEndUserData(null);
            }
        };

        fetchMessages();
    }, []);

    const formatMessageDate = (dateString: string) => {
        // Parse the PostgreSQL timestamptz format
        const date = new Date(dateString.replace(' ', 'T'));
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);

        // If it's today, show time
        if (date.toDateString() === now.toDateString()) {
            return date.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }).toLowerCase(); // Makes it look more like iMessage (e.g., "2:30 pm")
        }

        // If it's yesterday, show "Yesterday"
        if (date.toDateString() === yesterday.toDateString()) {
            return 'Yesterday';
        }

        // If it's within the last week, show day name
        if (date > weekAgo) {
            return date.toLocaleDateString('en-US', { weekday: 'long' });
        }

        // For older dates, show MM/DD/YY
        return date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: '2-digit'
        });
    };

    return (
        <main className="w-full bg-white h-full overflow-hidden">
            <div className="flex h-full">
                <div className="w-md h-full overflow-y-auto">
                    {messageData && messageData.length > 0 ? (
                        messageData.map((message, index) => (
                            <div
                                key={message.convoId}
                                className={`flex flex-row justify-center items-center w-full h-[11vh] border-solid border-[#DFDFDF] ${index === 0 ? 'border-b-[1px] border-r-[1px]' :
                                    'border-b-[1px] border-r-[1px]'
                                    } ${onMessage && message.convoId === convoNum ? 'bg-gray-100' : ''} hover:bg-gray-100 cursor-pointer`}
                                style={{ gap: '20px' }}
                                onClick={() => {
                                    if (onMessage) {
                                        if (message.convoId === convoNum) {
                                            setConvoNum(-1)
                                            setOnMessage(false)
                                        } else {
                                            setConvoNum(message.convoId)
                                        }
                                    } else {
                                        setConvoNum(message.convoId)
                                        setOnMessage(true)
                                    }
                                }}
                            >
                                <div className="flex justify-start items-center ml-[10px] w-[20px]">
                                    {message.numUnreadMessages != 0 && <div
                                        style={{
                                            backgroundColor: "#004D81",
                                            color: "#fff",
                                            fontSize: "12px",
                                            width: "20px",
                                            height: "20px",
                                            borderRadius: "50%",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontWeight: 500,
                                        }}
                                    >
                                        {message.numUnreadMessages}
                                    </div>}
                                </div>
                                <Image
                                    src={otherEndUserData?.profilePic ? getStorageImageUrl(otherEndUserData.profilePic) : "/img/message/sarah.svg"}
                                    alt="Profile Picture"
                                    width={52}
                                    height={52}
                                    className="rounded-[100%]"
                                />
                                <div className="flex flex-col w-[200px] ">
                                    <div className="text-[#919191] font-medium">
                                        {message.name}
                                    </div>
                                    <div className="text-[#4C4C4C]">
                                        {otherEndUserData && (
                                            otherEndUserData.userType === 1 
                                                ? `${otherEndUserData.firstName} ${otherEndUserData.lastName}`
                                                : otherEndUserData.userType === 2 
                                                    ? `Dr. ${otherEndUserData.lastName}`
                                                    : otherEndUserData.lastName
                                        )}
                                    </div>
                                </div>
                                <div className="flex w-[73px] mr-3 text-[#919191] font-thin justify-center items-center text-center">
                                    {formatMessageDate(message.lastMessageTime)}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="flex justify-center items-center h-full text-gray-500 bg-gray-100 w-full">
                            No messages yet
                        </div>
                    )}
                </div>

                {/*when we dont select any messages*/}
                {convoNum == -1 &&
                    <div className="flex-1 flex justify-center items-center overflow-hidden">
                        <div
                            onClick={() => {
                                setConvoNum(-2)
                                setOnMessage(true)
                            }}
                            data-property-1="Default"
                            className="w-[330px] h-[270px] flex justify-center items-center relative bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] border-[1px] border-dashed border-stone-900 overflow-hidden cursor-pointer"
                        >
                            <div className="mt-3 flex flex-col justify-center items-center gap-8 text-center">
                                <Image
                                    src="/img/message/create.svg"
                                    alt="Error"
                                    width={53}
                                    height={53}
                                />
                                <div className="text-neutral-400 text-lg font-normal leading-relaxed">Start new message</div>
                            </div>
                        </div>
                    </div>
                }
                {convoNum != -1 &&
                    <div className="flex-1 h-full overflow-hidden">
                        <MessageText convoID={convoNum}></MessageText>
                    </div>
                }
            </div>
        </main>
    );
}
