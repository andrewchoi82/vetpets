"use client"

import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import RecordsHeader from "@/components/HealthRecords/RecordsHeader";
import RecordsTable from "@/components/HealthRecords/RecordsTable";
import { useState } from "react";


export default function HealthRecords() {
   const [selectedTab, setSelectedTab] = useState<"vaccinations" | "test results" | "medications" | "medical history">("vaccinations");
  const [tabChange, setTabChange] = useState(false);

   return (
       <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
         <SideBarContainerClient selectedPage="Health records" />
   
         <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
            <Header title="Health Records" showSearchBar={true}/>

            <RecordsHeader selectedTab={selectedTab} setSelectedTabAction={setSelectedTab} tabChange={tabChange} setTabChange={setTabChange}/>
            <RecordsTable selectedTab={selectedTab} setSelectedTabAction={setSelectedTab} tabChange={tabChange} setTabChange={setTabChange}/>
         </div>
       </div>
   );
}