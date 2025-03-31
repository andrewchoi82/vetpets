"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'

export default function DashboardMessagesBox() {

    interface Message {
        messageId: number;
        name: string;
        date: string;
        type: string;
    }

    const sampData = [
        {
            messageId: 1,
            name: "Lab Results Ready",
            date: "03/16/25",
            type: "/img/dashboard/compLabIcon.svg",
        },
        {
            messageId: 2,
            name: "Medication Results Approved", 
            date: "02/22/25 ",
            type: "/img/dashboard/compApprovedIcon.svg",
        },
        {
            messageId: 3,
            name: "Urgent: Vaccine Due",
            date: "01/13/25 ",
            type: "/img/dashboard/compVaccineIcon.svg",
        },
        {
            messageId: 4,
            name: "New Test Ordered",
            date: "11/24/24",
            type: "/img/dashboard/compTestIcon.svg",
        },
        {
            messageId: 5,
            name: "Annual Check-up",
            date: "03/16/24",
            type: "/img/dashboard/compApprovedIcon.svg",
        }
    ];
    const [messageData, setMessageData] = useState<Message[]>([]);

    //this currently sets the sample appointment data to the state
    //change this later to add API to get real data
    useEffect(() => {
        setMessageData(sampData);
    }, []);

    return (
        <div className="w-[524px] h-[280px] bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] p-4 cursor-pointer">
            <div className="text-black text-xl font-bold mb-4">Recent Messages</div>
            
            <div className="flex flex-col gap-[15px]">
                {messageData.slice(0, 4).map((message, index) => (
                    <React.Fragment key={message.messageId}>
                        <div className="flex items-center gap-3">
                            <Image
                                src={message.type}
                                alt="Failed to Load"
                                width={28}
                                height={28}
                                className="flex-shrink-0"
                            />
                            <div className="flex justify-between items-center w-full">
                                <div className="text-black text-lg">{message.name}</div>
                                <div className="text-neutral-400 text-lg">{message.date}</div>
                            </div>
                        </div>
                        {index < Math.min(messageData.length, 4) - 1 && (
                            <div className="h-[1px] bg-neutral-400" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}
