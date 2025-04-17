"use client"

import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import BillingsHeader from "@/components/Billings/BillingsHeader";
import BillingsTable from "@/components/Billings/BillingsTable";
import { useState } from "react";


export default function Billings() {
   const [selectedTab, setSelectedTab] = useState<"current bills" | "payment history">("current bills");

   return (
       <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
         <SideBarContainerClient selectedPage="Billings"/>
   
         <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
            <Header title="Billings" />

            <BillingsHeader selectedTab={selectedTab} setSelectedTabAction={setSelectedTab}/>
            <BillingsTable selectedTab={selectedTab} setSelectedTabAction={setSelectedTab}/>
         </div>
       </div>
   );
}