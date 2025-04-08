"use client"

import { Header } from "@/components/MainHeader/Header";
import { SideBarContainer } from "@/components/MainSideBar/SideBarContainer";
import RecordsHeader from "@/components/HealthRecords/RecordsHeader";
import RecordsTable from "@/components/HealthRecords/RecordsTable";
import { useState } from "react";


export default function HealthRecords() {
   const [selectedTab, setSelectedTab] = useState<"vaccinations" | "test results" | "medications" | "medical history">("vaccinations");

   return (
       <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
         <SideBarContainer selectedPage="Health records" />
   
         <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
            <Header title="Health Records" />

            <RecordsHeader selectedTab={selectedTab} setSelectedTabAction={setSelectedTab}/>
            <RecordsTable selectedTab={selectedTab} setSelectedTabAction={setSelectedTab}/>
         </div>
       </div>
   );
}