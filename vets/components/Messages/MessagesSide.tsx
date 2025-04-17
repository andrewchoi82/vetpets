"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'

import { SideBarContainer } from "@/components/MainSideBar/SideBarContainer";
import DashboardRecentTestBox from "@/components/Dashboard/dashboardRecentTestBox"
import DashboardBillingBox from "@/components/Dashboard/dashboardBillingBox"
import DashboardMessagesBox from "@/components/Dashboard/dashboardRecentMessagesBox"
import DashboardAppointmentsBox from "@/components/Dashboard/dashboardAppointmentsBox"
import DashboardSmallBox from "@/components/Dashboard/dashboardSmallBox"
import { MessageHeaderBox } from "./MessageHeaderBox";
import { MessageMain } from "./MessageMain";
import  MessageText  from "./MessageText";


interface MessageOverviewProps {
    setPageState: React.Dispatch<React.SetStateAction<
      | { view: 'overview' }
      | { view: 'create' }
      | { view: 'texting'; conversationId: number }
    >>;
  }

//takes in prop of the setpagestate from page.tsx of message to change which modal is rendered
export default function MessagesSide({ setPageState }: MessageOverviewProps) {



    interface Message {
        messageId: number;
        name: string;
        date: string;
        doctor: string;
        doctorImage: string;
        numUnreadMessages: number;
    }


    const sampData = [
        {
            messageId: 1,
            name: "Lab Results Ready",
            date: "03/16/25",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
            numUnreadMessages: 2
        },
        {
            messageId: 2,
            name: "Potential ear infection",
            date: "01/16/25",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
            numUnreadMessages: 3
        },
        {
            messageId: 3,
            name: "Allergic reaction",
            date: "12/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
            numUnreadMessages: 0
        },
        {
            messageId: 4,
            name: "Red eye",
            date: "10/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
            numUnreadMessages: 0
        },
        {
            messageId: 5,
            name: "Constant zoomies",
            date: "09/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
            numUnreadMessages: 0
        },
        {
            messageId: 6,
            name: "Thorn stuck in paw",
            date: "08/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
            numUnreadMessages: 0
        },
        {
            messageId: 7,
            name: "Vaccine symptoms",
            date: "06/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
            numUnreadMessages: 0
        },
        {
            messageId: 8,
            name: "Appetite change",
            date: "05/16/24",
            doctor: "Dr.Sarah",
            doctorImage: "/img/message/sarah.svg",
            numUnreadMessages: 0
        },
        
    ];
    const [messageData, setMessageData] = useState<Message[]>([]);
    const [convoNum, setConvoNum] = useState(-1);
    const [onMessage, setOnMessage] = useState(false);



    //this currently sets the sample appointment data to the state
    //change this later to add API to get real data
    useEffect(() => {
        setMessageData(sampData);
    }, []);


    return (
        <main className="w-full bg-white h-full overflow-hidden">
            <div className="flex h-full">
                <div className="w-md h-full overflow-y-auto">
                    {messageData.map((message, index) => (
                        <div
                            key={message.messageId}
                            className={`flex flex-row justify-center items-center w-full h-[11vh] border-solid border-[#DFDFDF] ${index === 0 ? 'border-b-[1px] border-r-[1px]' :
                                    'border-b-[1px] border-r-[1px]'
                                } ${onMessage && message.messageId === convoNum ? 'bg-gray-100' : ''} hover:bg-gray-100 cursor-pointer`}
                            style={{ gap: '20px' }}
                            onClick={() => 
                                {if(onMessage){
                                    if(message.messageId === convoNum){
                                        setConvoNum(-1)
                                        setOnMessage(false)
                                    }
                                    else{
                                        setConvoNum(message.messageId)
                                    }
                                }
                                else{
                                    setConvoNum(message.messageId)
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
                                src="/img/message/sarah.svg"
                                alt="Error"
                                width={52}
                                height={52}
                                className="rounded-[100%]"
                            />
                            <div className="flex flex-col w-[200px] ">
                                <div className="text-[#919191] font-medium">
                                    {message.name}
                                </div>
                                <div className="text-[#4C4C4C]">
                                    {message.doctor}
                                </div>
                            </div>
                            <div className="flex w-[73px] mr-3 text-[#919191] font-thin">
                                {message.date}
                            </div>
                        </div>
                    ))}
                </div>

                {/*when we dont select any messages*/}
                {convoNum == -1 &&   
                <div className="flex-1 flex justify-center items-center overflow-hidden">
                    <div
                        onClick={() => {setConvoNum(-2)
                            setOnMessage(true)}}
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
