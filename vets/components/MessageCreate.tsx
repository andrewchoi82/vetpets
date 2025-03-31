"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'

import { SideBarContainer } from "@/components/SideBarContainer";
import DashboardRecentTestBox from "@/components/dashboardRecentTestBox"
import DashboardBillingBox from "@/components/dashboardBillingBox"
import DashboardMessagesBox from "@/components/dashboardMessagesBox"
import DashboardAppointmentsBox from "@/components/dashboardAppointmentsBox"
import DashboardSmallBox from "@/components/dashboardSmallBox"

interface MessageOverviewProps {
   setPageState: React.Dispatch<React.SetStateAction<'overview' | 'create' | 'texting'>>;
}

//takes in prop of the setpagestate from page.tsx of message to change which modal is rendered
export default function MessageCreate({ setPageState }: MessageOverviewProps) {
   return (
      <main className="absolute max-w-[1300px] w-[1300px] min-h-[82vh] bg-[#F7F7F7] left-[250px] 2xl:left-[350px] top-[13.6vh] rounded-[40px] p-[30px] mr-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]">
         <div className="flex flex-col gap-10">
         <Image
               src="/img/message/backbutton.svg"
               alt="error"
               width={18}
               height={24}
               className="rounded-full cursor-pointer"
               onClick={() => setPageState('overview')}
            />
            <div className="w-40 h-10 bg-sky-800 rounded-[10px] inline-flex justify-center items-center gap-2.5 cursor-pointer" onClick={() => setPageState('texting')}>
               <div className="text-center justify-center text-white text-lg font-bold leading-relaxed">Send</div>
            </div>

         </div>
      </main>
   );
}
