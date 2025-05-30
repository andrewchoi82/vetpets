"use client";

import DashboardRecentTestBox from "@/components/Dashboard/dashboardRecentTestBox";
import DashboardBillingBox from "@/components/Dashboard/dashboardBillingBox";
import DashboardMessagesBox from "@/components/Dashboard/dashboardRecentMessagesBox";
import DashboardAppointmentsBox from "@/components/Dashboard/dashboardAppointmentsBox";
import { getImageUrl as getStorageImageUrl } from '@/app/lib/supabaseGetImage';
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Image from 'next/image';
import { getPetById } from "@/app/lib/api/pets";
import { getImageUrl } from "@/app/lib/supabaseGetImage";


export default function MainContentNew() {
  type Pet = {
    breed: string;
    age: string;
    weight: string;
    sex: string;
    sterilized: boolean;
    pet_picture: string;
    name: string;
  };

  const [pet, setPet] = useState<Pet | null>(null);

  const [loading, setLoading] = useState(true);
  const petId = Cookies.get('petId');

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetById(petId || '');
        setPet(data);
      } catch (err) {
        console.error("Failed to fetch pet data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPet();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
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
    <main className="p-[5px] md:p-[50px] h-full bg-[#F9F9F9]">
      <div className="flex items-center gap-2 bg-[#F9F9F9] ">
        <h1 className="text-3xl font-bold">{pet?.name || ""}</h1>
        <Image
          src="/img/dashboard/paw.svg"
          alt="Snowball"
          width={50}
          height={50}
          className="mt-2"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="flex gap-[min(30px,2vw)] bg-[#F9F9F9]">
          <div className="w-[40%]">
            <Image
              src={(!pet?.pet_picture || pet?.pet_picture==="") ? "/img/message/doggg.png" : getImageUrl(pet?.pet_picture)}
              alt="Snowball"
              width={250}
              height={284}
              className="w-full h-[284px] object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="w-[60%] bg-white rounded-xl shadow-md p-6 flex flex-col h-[284px]">
            <div className="mt-4 space-y-4 w-full">
              <InfoItem icon="/img/dashboard/dashboardAge.svg" label="Age" value={pet?.age||""} />
              <InfoItem icon="/img/dashboard/sex-icon.svg" label="Gender" value={pet?.sex||""} />
              <InfoItem icon="/img/dashboard/dashboardWeight.svg" label="Weight" value={pet?.weight||""} />
              <InfoItem icon="/img/dashboard/dashboardBreed.svg" label="Breed" value={pet?.breed||""} />
              <InfoItem
                icon="/img/dashboard/sterilized-icon.svg"
                label="Sterilized"
                value={pet?.sterilized !== undefined ? (pet.sterilized ? "Yes" : "No") : "N/A"}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 max-h-72 h-72 mr-[8px] md:mr-0">
          <DashboardMessagesBox />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 max-h-72 h-72 mr-[8px] md:mr-0">
          <DashboardAppointmentsBox />
        </div>

        <div className="bg-white rounded-xl shadow-md p-4 max-h-72 h-72 mr-[8px] md:mr-0">
          <DashboardBillingBox />
        </div>
      </div>
    </main>
  );
}

function InfoItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  const formatValue = (label: string, value: string) => {
    if (!value) return "N/A";
    
    switch (label) {
      case "Age":
        // Convert to years and months if possible
        const ageNum = parseFloat(value);
        if (!isNaN(ageNum)) {
          const years = Math.floor(ageNum);
          const months = Math.round((ageNum - years) * 12);
          if (years === 0) {
            return `${months} month${months !== 1 ? 's' : ''}`;
          } else if (months === 0) {
            return `${years} year${years !== 1 ? 's' : ''}`;
          }
          return `${years} year${years !== 1 ? 's' : ''}, ${months} month${months !== 1 ? 's' : ''}`;
        }
        return value;
      
      case "Weight":
        // Convert to pounds with one decimal place
        const weightNum = parseFloat(value);
        if (!isNaN(weightNum)) {
          return `${weightNum.toFixed(1)} lb${weightNum !== 1 ? 's' : ''}`;
        }
        return value;
      
      case "Gender":
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      
      case "Breed":
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      
      case "Sterilized":
        return value === "true" ? "Yes" : "No";
      
      default:
        return value;
    }
  };

  return (
    <div className="flex items-center">
      <Image src={icon} alt="icon" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5 mr-4 md:mr-6" />
      <span className="text-Text-Main text-sm md:text-base font-medium leading-loose">{label}:</span>
      <span className="text-Text-Main text-sm md:text-base font-normal leading-loose ml-1">{formatValue(label, value)}</span>
    </div>
  );
}
