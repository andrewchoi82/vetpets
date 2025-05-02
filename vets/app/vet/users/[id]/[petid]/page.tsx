"use client";

import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerVets } from "@/components/MainSideBar/SideBarContainerVets";
import RecordsHeader from "@/components/HealthRecords/RecordsHeader";
import PetTableDetails from "@/components/vet/Pets/PetDetailTables";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Cookies from 'js-cookie';

export default function PetHealthRecords() {
  const [selectedTab, setSelectedTab] = useState<"vaccinations" | "test results" | "medications" | "medical history">("vaccinations");
  const [tabChange, setTabChange] = useState(false);
  const [petName, setPetName] = useState("");
  
  const params = useParams();
  const petIdStr = params.petid as string;
  const petId = petIdStr ? parseInt(petIdStr, 10) : undefined;
  
  // Store petId in cookie for health records API calls
  useEffect(() => {
    if (petId) {
      Cookies.set('petId', petId.toString());
      
      // Fetch pet details to display name in header
      const fetchPetDetails = async () => {
        try {
          const res = await fetch(`/api/pets/${petId}`, {
            method: 'GET',
          });
          
          if (!res.ok) {
            throw new Error(`API returned status: ${res.status}`);
          }
          
          const data = await res.json();
          setPetName(data.name || 'Pet Details');
        } catch (error) {
          console.error("Error fetching pet details:", error);
        }
      };
      
      fetchPetDetails();
    }
  }, [petId]);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerVets selectedPage="Clients" />
   
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        background: "#fff", 
        overflowY: "auto",
        marginLeft: "120px" // Add margin to avoid overlap with the sidebar
      }}>
        <Header title={petName ? `${petName}'s Health Records` : "Pet Health Records"} showSearchBar={true}/>

        <RecordsHeader 
          selectedTab={selectedTab} 
          setSelectedTabAction={setSelectedTab} 
          tabChange={tabChange} 
          setTabChange={setTabChange}
        />
        <PetTableDetails 
          selectedTab={selectedTab} 
          setSelectedTabAction={setSelectedTab} 
          tabChange={tabChange} 
          setTabChange={setTabChange}
        />
      </div>
    </div>
  );
}