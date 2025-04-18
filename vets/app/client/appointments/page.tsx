"use client"
import AppointmentsHeader from "@/components/Appointments/AppointmentsHeader";
import AppointmentsTable from "@/components/Appointments/AppointmentsTable";
import { Header } from "@/components/MainHeader/Header";
import MainContent from "@/components/Dashboard/MainContent";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import { useState } from "react";


export default function Appointments() {
   const [selectedTab, setSelectedTab] = useState<"upcoming" | "past">("upcoming");

   return (
       <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
         <SideBarContainerClient selectedPage="Appointments" />
   
         <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
            <Header title="Appointments" showSearchBar={true}/>
           
            <AppointmentsHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
            <AppointmentsTable/>

         </div>
       </div>
   );
}