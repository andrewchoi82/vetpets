"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'

import { SideBarContainer } from "@/components/SideBarContainer";
import DashboardRecentTestBox from "@/components/dashboardRecentTestBox"
import DashboardBillingBox from "@/components/dashboardBillingBox"
import DashboardMessagesBox from "@/components/dashboardMessagesBox"
import DashboardAppointmentsBox from "@/components/dashboardAppointmentsBox"
import DashboardSmallBox from "@/components/dashboardSmallBox"


export default function MainContent() {
   return(
      <main className="absolute max-w-[1300px] min-h-[82vh] bg-[#F7F7F7] left-[250px] 2xl:left-[350px] top-[13.6vh] rounded-[40px] p-[30px] mr-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)]">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[2vw] md:gap-[3vw] lg:gap-[2.5vw]">
            <DashboardSmallBox label={"Breed"} value={"Husky"} image={"/img/dashboard/dashboardBreed.svg"}/>
            <DashboardSmallBox label={"Age"} value={"4 Months"} image={"/img/dashboard/dashboardAge.svg"}/>
            <DashboardSmallBox label={"Weight"} value={"32 lb"} image={"/img/dashboard/dashboardWeight.svg"}/>
            <DashboardSmallBox label={"Gender"} value={"Male"} image={"/img/dashboard/dashboardGender.svg"}/>
         </div>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2vw] md:gap-[3vw] lg:gap-[2.5vw] mt-[2vw] md:mt-[3vw] lg:mt-[2.5vw]">
            <DashboardAppointmentsBox/>
            <DashboardMessagesBox/>
         </div>
         
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2vw] md:gap-[3vw] lg:gap-[2.5vw] mt-[2vw] md:mt-[3vw] lg:mt-[2.5vw]">
            <DashboardBillingBox/>
            <DashboardRecentTestBox/>
         </div>
      </main>
   );
}
