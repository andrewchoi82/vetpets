"use client";

import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import BillingsHeader from "@/components/Billings/BillingsHeader";
import BillingsTable from "@/components/Billings/BillingsTable";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Billings() {
  const [selectedTab, setSelectedTab] = useState<"current bills" | "payment history">("current bills");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetching for demo; replace with real logic later
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [selectedTab]);

  if (loading) {
    return (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <SideBarContainerClient selectedPage="Billings" />
        <div style={{ 
          flex: 1, 
          position: "relative", 
          backgroundColor: "#fff", 
          marginLeft: "120px" 
        }}>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ffffff",
            zIndex: 10
          }}>
            <Image
              src="/img/vetrail-logo.svg"
              alt="Loading..."
              width={80}
              height={80}
              style={{
                animation: "spin 1.5s linear infinite"
              }}
            />
          </div>

          <style jsx>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerClient selectedPage="Billings" />

      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        background: "#fff", 
        overflowY: "auto",
        marginLeft: "120px"
      }}>
        <Header title="" showSearchBar={true} />
        <BillingsHeader selectedTab={selectedTab} setSelectedTabAction={setSelectedTab} />
        <BillingsTable selectedTab={selectedTab} setSelectedTabAction={setSelectedTab} />
      </div>
    </div>
  );
}
