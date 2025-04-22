
"use client";
import React from "react";
import Image from "next/image";



interface RecordsHeaderProps {
  selectedTab: "vaccinations" | "test results" | "medications" | "medical history";
  setSelectedTabAction: (tab: "vaccinations" | "test results" | "medications" | "medical history") => void;
  tabChange: boolean;
  setTabChange: (change: boolean) => void;
}


export default function RecordsHeader({selectedTab, setSelectedTabAction ,tabChange, setTabChange} : RecordsHeaderProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 24px", borderBottom: "1px solid #e5e7eb" }}>
      {/* Tabs */}
      <div style= {{display: "flex", alignItems: "center"}}> 
         <div style={{ display: "flex", gap: "32px", marginTop: "25px" }}>
            <button
               onClick={() => {setSelectedTabAction("vaccinations")
                  setTabChange(!tabChange);
               }}
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginTop: "5px",
                  paddingBottom: "14px",
                  border: "none",
                  background: "none",
                  borderBottom: selectedTab === "vaccinations" ? "2px solid #1e3a8a" : "2px solid transparent",
                  color: selectedTab === "vaccinations" ? "#1e3a8a" : "#4b5563",
                  fontWeight: selectedTab === "vaccinations" ? 500 : 300,
                  fontSize: "17px",
                  cursor: "pointer",
               }}
            >
               <Image src="/img/health-records/vaccinations-icon.svg" alt="Vaccinations" width={19} height={19} />
               Vaccinations
            </button>

            <button
               onClick={() => {setSelectedTabAction("test results");
                  setTabChange(!tabChange);

               }}
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginTop: "5px",
                  paddingBottom: "14px",
                  border: "none",
                  background: "none",
                  borderBottom: selectedTab === "test results" ? "2px solid #1e3a8a" : "2px solid transparent",
                  color: selectedTab === "test results" ? "#1e3a8a" : "#4b5563",
                  fontWeight: selectedTab === "test results" ? 500 : 300,
                  fontSize: "17px",
                  cursor: "pointer",
               }}
            >
               <Image src="/img/health-records/test-results-icon.svg" alt="Test Results" width={25} height={18.75} />
               Test Results
            </button>

            <button
               onClick={() => {setSelectedTabAction("medications");
                  setTabChange(!tabChange);}
               }
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginTop: "5px",
                  paddingBottom: "14px",
                  border: "none",
                  background: "none",
                  borderBottom: selectedTab === "medications" ? "2px solid #1e3a8a" : "2px solid transparent",
                  color: selectedTab === "medications" ? "#1e3a8a" : "#4b5563",
                  fontWeight: selectedTab === "medications" ? 500 : 300,
                  fontSize: "17px",
                  cursor: "pointer",
               }}
            >
               <Image src="/img/health-records/medications-icon.svg" alt="Medications" width={24} height={19}/>
               Medications
            </button>

            <button
               onClick={() => {setSelectedTabAction("medical history");
                  setTabChange(!tabChange);
               }
               }
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "14px",
                  marginTop: "5px",
                  paddingBottom: "14px",
                  border: "none",
                  background: "none",
                  borderBottom: selectedTab === "medical history" ? "2px solid #1e3a8a" : "2px solid transparent",
                  color: selectedTab === "medical history" ? "#1e3a8a" : "#4b5563",
                  fontWeight: selectedTab === "medical history" ? 500 : 300,
                  fontSize: "17px",
                  cursor: "pointer",
               }}
            >
               <Image src="/img/health-records/medical-history-icon.svg" alt="Medical History" width={14} height={19}/>
               Medical History
            </button>
            </div>
         </div>
    </div>
  );
}
