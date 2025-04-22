"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'

import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import DashboardRecentTestBox from "@/components/Dashboard/dashboardRecentTestBox"
import DashboardBillingBox from "@/components/Dashboard/dashboardBillingBox"
import DashboardMessagesBox from "@/components/Dashboard/dashboardRecentMessagesBox"
import DashboardAppointmentsBox from "@/components/Dashboard/dashboardAppointmentsBox"
import DashboardSmallBox from "@/components/Dashboard/dashboardSmallBox"
import { MessageHeaderBox } from "./MessageHeaderBox";
import { MessageMain } from "./MessageMain";

interface MessageOverviewProps {
   setPageState: React.Dispatch<React.SetStateAction<'overview' | 'create' | 'texting'>>;
}

//takes in prop of the setpagestate from page.tsx of message to change which modal is rendered
export default function MessageCreate({ setPageState }: MessageOverviewProps) {

   const [message, setMessage] = useState("");

   return (
      <main className="w-full max-h-[700px] bg-[#F7F7F7] ml-10 mr-10 mt-10 mb-20 pb-5 rounded-[32px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]">
         <div className="flex flex-col gap-10">
         <Image
               src="/img/message/backbutton.svg"
               alt="error"
               width={18}
               height={24}
               className="rounded-full cursor-pointer"
               onClick={() => setPageState('overview')}
               style={{ marginLeft: "40px", marginTop: "35px"}}
            />

         <div style={{
               display: "flex",
               flexDirection: "column",
               alignItems: "center",
               marginTop: "-50px"  
            }}>
            <MessageHeaderBox functionName={"to"} content={["Dr.Smith", "Dr. Joe"]}/>
            <MessageHeaderBox functionName={"subject"} content={["Potential Ear Infection"]}/>
            <MessageMain message={message} setMessage={setMessage}/>
            <div className="w-40 h-10 bg-sky-800 rounded-[10px] inline-flex justify-center items-center gap-2.5 cursor-pointer mt-4" onClick={() => setPageState('texting')}>
               <div className="text-center justify-center text-white text-lg font-bold leading-relaxed">Send</div>
            </div>

         </div>

            

            



         </div>
      </main>
   );
}
