"use client"
import AppointmentsHeader from "@/components/Appointments/AppointmentsHeader";
import AppointmentsTable from "@/components/Appointments/AppointmentsTable";
import { Header } from "@/components/Header";
import MainContent from "@/components/MainContent";
import { SideBarContainer } from "@/components/SideBar/SideBarContainer";
import { useState } from "react";


export default function Appointments() {
   const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">("upcoming");

   return (
       <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
         <SideBarContainer selectedPage="Appointments" />
   
         <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
           <Header title="Appointments" />
           
            <AppointmentsHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
            <AppointmentsTable/>



           
         </div>
       </div>
   );
}