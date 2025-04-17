
"use client";
import React from "react";
import Image from "next/image";

interface BillingsTableProps {
   selectedTab: "current bills" | "payment history";
   setSelectedTabAction: (tab: "current bills" | "payment history") => void;
}

export default function RecordsHeader({ selectedTab, setSelectedTabAction }: BillingsTableProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 24px", borderBottom: "1px solid #e5e7eb" }}>
      {/* Tabs */}
      <div style= {{display: "flex", alignItems: "center"}}> 
         <div style={{ display: "flex", gap: "32px", marginTop: "25px" }}>
            <button
               onClick={() => setSelectedTabAction("current bills")}
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "5px",
                  paddingBottom: "14px",
                  border: "none",
                  background: "none",
                  borderBottom: selectedTab === "current bills" ? "2px solid #1e3a8a" : "2px solid transparent",
                  color: selectedTab === "current bills" ? "#1e3a8a" : "#4b5563",
                  fontWeight: selectedTab === "current bills" ? 500 : 300,
                  fontSize: "17px",
                  cursor: "pointer",
               }}
            >
               <Image src="/img/billings/current-bills-icon.svg" alt="Current bills" width={16} height={16} />
               Current bills
            </button>

            <button
               onClick={() => setSelectedTabAction("payment history")}
               style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  marginTop: "5px",
                  paddingBottom: "14px",
                  border: "none",
                  background: "none",
                  borderBottom: selectedTab === "payment history" ? "2px solid #1e3a8a" : "2px solid transparent",
                  color: selectedTab === "payment history" ? "#1e3a8a" : "#4b5563",
                  fontWeight: selectedTab === "payment history" ? 500 : 300,
                  fontSize: "17px",
                  cursor: "pointer",
               }}
            >
               <Image src="/img/billings/payment-history-icon.svg" alt="Payment history" width={16} height={16} />
               Payment history
            </button>

            
            </div>
         </div>
    </div>
  );
}
