"use client";

import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import RecordsHeader from "@/components/HealthRecords/RecordsHeader";
import RecordsTable from "@/components/HealthRecords/RecordsTable";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function HealthRecords() {
  const [selectedTab, setSelectedTab] = useState<"vaccinations" | "test results" | "medications" | "medical history">("vaccinations");
  const [tabChange, setTabChange] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // Replace this with actual data fetch logic
    return () => clearTimeout(timer);
  }, [selectedTab, tabChange]);

  if (loading) {
    return (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <SideBarContainerClient selectedPage="Health records" />
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
      <SideBarContainerClient selectedPage="Health records" />

      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        background: "#fff", 
        overflowY: "auto",
        marginLeft: "120px"
      }}>
        <Header title="" showSearchBar={true} />
        <RecordsHeader
          selectedTab={selectedTab}
          setSelectedTabAction={setSelectedTab}
          tabChange={tabChange}
          setTabChange={setTabChange}
        />
        <RecordsTable
          selectedTab={selectedTab}
          setSelectedTabAction={setSelectedTab}
          tabChange={tabChange}
          setTabChange={setTabChange}
        />
      </div>
    </div>
  );
}
