
"use client";
import React from "react";
import Image from "next/image";

interface AppointmentsHeaderProps {
  selectedTab: "vaccinations" | "test results" | "medications" | "medical history";
  setSelectedTab: (tab: "vaccinations" | "test results" | "medications" | "medical history") => void;
}

export default function RecordsHeader({ selectedTab, setSelectedTab }: AppointmentsHeaderProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 24px", borderBottom: "1px solid #e5e7eb" }}>
      {/* Tabs */}
      <div style= {{display: "flex", alignItems: "center"}}> 
         <div style={{ display: "flex", gap: "32px", marginTop: "25px" }}>
            <button
               onClick={() => setSelectedTab("vaccinations")}
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "5px",
                  paddingBottom: "14px",
                  border: "none",
                  background: "none",
                  borderBottom: selectedTab === "vaccinations" ? "2px solid #1e3a8a" : "2px solid transparent",
                  color: selectedTab === "vaccinations" ? "#1e3a8a" : "#4b5563",
                  fontWeight: selectedTab === "vaccinations" ? 500 : 300,
                  fontSize: "15px",
                  cursor: "pointer",
               }}
            >
               <Image src="/img/health-records/vaccinations-icon.svg" alt="Vaccinations" width={16} height={16} />
               Vaccinations
            </button>

            <button
               onClick={() => setSelectedTab("test results")}
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "5px",
                  paddingBottom: "14px",
                  border: "none",
                  background: "none",
                  borderBottom: selectedTab === "test results" ? "2px solid #1e3a8a" : "2px solid transparent",
                  color: selectedTab === "test results" ? "#1e3a8a" : "#4b5563",
                  fontWeight: selectedTab === "test results" ? 500 : 300,
                  fontSize: "15px",
                  cursor: "pointer",
               }}
            >
               <Image src="/img/health-records/test-results-icon.svg" alt="Test Results" width={16} height={16} />
               Test Results
            </button>

            <button
               onClick={() => setSelectedTab("medications")}
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "5px",
                  paddingBottom: "14px",
                  border: "none",
                  background: "none",
                  borderBottom: selectedTab === "medications" ? "2px solid #1e3a8a" : "2px solid transparent",
                  color: selectedTab === "medications" ? "#1e3a8a" : "#4b5563",
                  fontWeight: selectedTab === "medications" ? 500 : 300,
                  fontSize: "15px",
                  cursor: "pointer",
               }}
            >
               <Image src="/img/health-records/medications-icon.svg" alt="Medications" width={16} height={16} />
               Medications
            </button>

            <button
               onClick={() => setSelectedTab("medical history")}
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "5px",
                  paddingBottom: "14px",
                  border: "none",
                  background: "none",
                  borderBottom: selectedTab === "medical history" ? "2px solid #1e3a8a" : "2px solid transparent",
                  color: selectedTab === "medical history" ? "#1e3a8a" : "#4b5563",
                  fontWeight: selectedTab === "medical history" ? 500 : 300,
                  fontSize: "15px",
                  cursor: "pointer",
               }}
            >
               <Image src="/img/health-records/medical-history-icon.svg" alt="Medical History" width={16} height={16} />
               Medical History
            </button>
            </div>
         </div>

         {/* Schedule Button */}
         <button
         style={{
            backgroundColor: "#1e3a8a",
            color: "white",
            padding: "8px 16px",
            borderRadius: "6px",
            fontWeight: 500,
            fontSize: "14px",
            cursor: "pointer",
            marginBottom: "11px"
         }}
         >
         Schedule Appointment
         </button>
    </div>
  );
}
