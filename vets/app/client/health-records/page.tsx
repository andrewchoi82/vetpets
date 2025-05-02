"use client";

import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import RecordsHeader from "@/components/HealthRecords/RecordsHeader";
import RecordsTable from "@/components/HealthRecords/RecordsTable";
import { useEffect, useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";

export default function HealthRecords() {
  const [selectedTab, setSelectedTab] = useState<"vaccinations" | "test results" | "medications" | "medical history">("vaccinations");
  const [tabChange, setTabChange] = useState(false);

  const [allRecords, setAllRecords] = useState<{
    vaccinations: any[];
    test_results: any[];
    medications: any[];
    medical_history: any[];
  }>({
    vaccinations: [],
    test_results: [],
    medications: [],
    medical_history: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllHealthRecords();
  }, []); // Only fetch once when component mounts

  const fetchAllHealthRecords = async () => {
    setLoading(true);
    try {
      const petId = Cookies.get('petId');
      if (!petId) throw new Error('No pet ID found');

      // Fetch all types of records in parallel using API routes
      const [vaccinationsRes, testResultsRes, medicationsRes, medicalHistoryRes] = await Promise.all([
        fetch(`/api/vaccinations?petId=${petId}`).then(res => res.json()),
        fetch(`/api/tests?petId=${petId}`).then(res => res.json()),
        fetch(`/api/medications?petId=${petId}`).then(res => res.json()),
        fetch(`/api/history?petId=${petId}`).then(res => res.json())
      ]);

      // Update state with all fetched data
      setAllRecords({
        vaccinations: vaccinationsRes || [],
        test_results: testResultsRes || [],
        medications: medicationsRes || [],
        medical_history: medicalHistoryRes || []
      });
    } catch (error) {
      console.error("Error fetching health records:", error);
    } finally {
      setLoading(false);
    }
  };

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

  // Convert selected tab to the corresponding key in allRecords
  const selectedTabKey = selectedTab.replace(' ', '_') as keyof typeof allRecords;
  const currentRecords = allRecords[selectedTabKey];

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
          setTabChange={setTabChange} // No longer needed since we fetch all data at once
        />
        {currentRecords.length === 0 ? (
          <div style={{ 
            display: "flex", 
            flexDirection: "column", 
            alignItems: "center", 
            justifyContent: "center", 
            padding: "40px",
            color: "#4C4C4C",
            fontStyle: "italic"
          }}>
            {`No ${selectedTab} records found.`}
          </div>
        ) : (
          <RecordsTable
            selectedTab={selectedTab}
            setSelectedTabAction={setSelectedTab}
            tabChange={tabChange}
            setTabChange={setTabChange} // No longer needed since we fetch all data at once
            records={currentRecords}
          />
        )}
      </div>
    </div>
  );
}
