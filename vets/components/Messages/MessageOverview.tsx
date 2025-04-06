"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'

import { SideBarContainer } from "@/components/MainSideBar/SideBarContainer";
import DashboardRecentTestBox from "@/components/Dashboard/dashboardRecentTestBox"
import DashboardBillingBox from "@/components/Dashboard/dashboardBillingBox"
import DashboardMessagesBox from "@/components/Dashboard/dashboardMessagesBox"
import DashboardAppointmentsBox from "@/components/Dashboard/dashboardAppointmentsBox"
import DashboardSmallBox from "@/components/Dashboard/dashboardSmallBox"


interface MessageOverviewProps {
    setPageState: React.Dispatch<React.SetStateAction<'overview' | 'create' | 'texting'>>;
  }
  
//takes in prop of the setpagestate from page.tsx of message to change which modal is rendered
export default function MessageOverview({ setPageState }: MessageOverviewProps) {

    interface Message {
        messageId: number;
        name: string;
        date: string;
        doctor: string;
        doctorImage: string;
    }

    const sampData = [
        {
            messageId: 1,
            name: "Lab Results Ready",
            date: "03/16/25",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
        },
        {
            messageId: 2,
            name: "Potential ear infection",
            date: "01/16/25",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
        },
        {
            messageId: 3,
            name: "Allergic reaction",
            date: "12/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
        },
        {
            messageId: 4,
            name: "Red eye",
            date: "10/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
        },
        {
            messageId: 5,
            name: "Constant zoomies",
            date: "09/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
        },
        {
            messageId: 6,
            name: "Thorn stuck in paw",
            date: "08/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
        },
        {
            messageId: 7,
            name: "Vaccine symptoms",
            date: "06/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
        },
        {
            messageId: 8,
            name: "Appetite change",
            date: "05/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
        },
        {
            messageId: 9,
            name: "Lab Results Ready",
            date: "04/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
        },
    ];
    const [messageData, setMessageData] = useState<Message[]>([]);

    //this currently sets the sample appointment data to the state
    //change this later to add API to get real data
    useEffect(() => {
        setMessageData(sampData);
    }, []);


    return (
        <main className="w-full bg-[#F7F7F7] mr-10 mt-5 mb-10 pb-10 rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-[60px] gap-x-4">

                {/*First grid item is create new message. Clicking this changes the state to create and sets the create component to be rendered*/}
                <div 
                    onClick={() => setPageState('create')}
                    data-property-1="Default" 
                    className="w-60 h-64 ml-10 mt-10 relative bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] border-[1px] border-dashed border-stone-900 overflow-hidden cursor-pointer"
                >
                    <div className="w-48 left-[24px] top-[92px] absolute inline-flex flex-col justify-start items-center gap-8">
                        <Image
                            src="/img/message/create.svg"
                            alt="Error"
                            width={53}
                            height={53}
                        />
                        <div className="self-stretch h-12 text-center justify-center text-neutral-400 text-lg font-normal leading-relaxed">Start new message</div>
                    </div>
                </div>

                {/*The rest is thes messages. Clicking this changes the state to texting and sets the texting component to be rendered*/}
                {messageData.map((message) => (
                    <div key={message.messageId} data-property-1="Default" className="w-60 h-64 ml-10 mt-10 relative bg-white rounded-[20px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] overflow-hidden">

                        <div className="w-52 left-[16px] top-[13px] absolute inline-flex flex-col justify-start items-start gap-4">
                            <div className="self-stretch h-6 justify-center text-neutral-400 text-base font-bold  leading-snug">{message.doctor}</div>
                            <div className="self-stretch flex flex-col justify-start items-center gap-7">
                                {message.doctorImage ? (
                                    <Image
                                        src={message.doctorImage}
                                        alt="Doctor's image"
                                        width={105}
                                        height={105}
                                        className="rounded-full"
                                    />
                                ) : (
                                    // Optionally render a placeholder or nothing
                                    <div>No image available</div>
                                )}
                                <div className="self-stretch flex flex-col justify-start items-start">
                                    <div className="self-stretch h-6 text-center justify-center text-black text-lg font-normal  leading-relaxed">{message.name}</div>
                                    <div className="self-stretch h-6 text-center justify-center text-neutral-400 text-lg font-normalleading-relaxed">{message.date}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
        
            </div>
        </main>
    );
}
