"use client"

import DashboardRecentTestBox from "@/components/Dashboard/dashboardRecentTestBox";
import DashboardBillingBox from "@/components/Dashboard/dashboardBillingBox";
import DashboardMessagesBox from "@/components/Dashboard/dashboardRecentMessagesBox";
import DashboardAppointmentsBox from "@/components/Dashboard/dashboardAppointmentsBox";
import DashboardSmallBox from "@/components/Dashboard/dashboardSmallBox";
import { useState, useEffect } from "react";

import { getPetById } from "@/app/lib/api/pets";

export default function MainContent() {
  type Pet = {
    breed: string;
    age: string;
    weight: string;
    sex: string;
    sterilized: string;
  };  

  const [pet, setPet] = useState<Pet | null>(null);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetById("1"); 
        setPet(data);
      } catch (err) {
        console.error("Failed to fetch pet data", err);
      }
    };
  
    fetchPet();
  }, []);
  

  return (
    <main style={{ padding: "30px" }}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 ml-5">
      {pet && (
        <>
          <DashboardSmallBox
            label="Breed"
            value={pet.breed}
            image="/img/dashboard/dashboardBreed.svg"
          />
          <DashboardSmallBox
            label="Age"
            value={pet.age}
            image="/img/dashboard/dashboardAge.svg"
          />
          <DashboardSmallBox
            label="Weight"
            value={pet.weight}
            image="/img/dashboard/dashboardWeight.svg"
          />
          <DashboardSmallBox
            label="Sex"
            value={pet.sex}
            image="/img/dashboard/sex-icon.svg"
          />
          <DashboardSmallBox
            label="Sterilized"
            value={pet.sterilized ? "Yes" : "No"}
            image="/img/dashboard/sterilized-icon.svg"
          />
        </>
      )}

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 ml-5">
        <DashboardAppointmentsBox />
        <DashboardMessagesBox />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 ml-5">
        <DashboardBillingBox />
        <DashboardRecentTestBox />
      </div>
    </main>
  );
}
