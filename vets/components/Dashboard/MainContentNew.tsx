"use client"

import DashboardRecentTestBox from "@/components/Dashboard/dashboardRecentTestBox";
import DashboardBillingBox from "@/components/Dashboard/dashboardBillingBox";
import DashboardMessagesBox from "@/components/Dashboard/dashboardRecentMessagesBox";
import DashboardAppointmentsBox from "@/components/Dashboard/dashboardAppointmentsBox";
import DashboardSmallBox from "@/components/Dashboard/dashboardSmallBox";
import { getImageUrl as getStorageImageUrl } from '@/app/lib/supabaseGetImage';
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import Image from 'next/image';

import { getPetById } from "@/app/lib/api/pets";

export default function MainContentNew() {
  type Pet = {
    breed: string;
    age: string;
    weight: string;
    sex: string;
    sterilized: boolean;
    petpicture: string;
  };

  const [pet, setPet] = useState<Pet | null>(null);
  const petId = Cookies.get('petId');


  useEffect(() => {
    const fetchPet = async () => {
      try {
        const data = await getPetById(petId || '');
        setPet(data);
      } catch (err) {
        console.error("Failed to fetch pet data", err);
      }
    };

    fetchPet();
  }, []);


  return (
    <main className="p-[5px] md:p-[50px] h-full bg-[#F9F9F9]">
      <div className="flex items-center gap-2 bg-[#F9F9F9] ">
        <h1 className="text-3xl font-bold">Snowball</h1>
        <Image
          src="/img/dashboard/paw.svg" // replace with correct path
          alt="Snowball"
          width={50}
          height={50}
          className="mt-2"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 ">
        {/* Left Column - Pet Info and Image */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#F9F9F9]">
          {/* Pet Image */}
          <Image 
            src={pet?.petpicture ? getStorageImageUrl(pet.petpicture) : "/img/message/doggg.png"}
            alt="Snowball"
            width={250}
            height={284}
            className="w-64 max-h-72 h-72 object-cover rounded-xl shadow-md mx-auto md:mx-0"
          />

          {/* Pet Info */}
          <div className="bg-white rounded-xl shadow-md p-6 flex flex-col mr-[8px] md:mr-0 max-h-72 h-72">
            <div className="mt-4 space-y-4 w-full">
              <div className="flex items-center">
                <Image
                  src="/img/dashboard/dashboardAge.svg"
                  alt="error"
                  width={50}
                  height={50}
                  className="w-4 h-4 md:w-5 md:h-5 mr-4 md:mr-6"
                />
                <span className="text-Text-Main text-sm md:text-base font-medium leading-loose">Age:</span>
                <span className="text-Text-Main text-sm md:text-base font-normal leading-loose ml-1">{pet?.age || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <Image
                  src="/img/dashboard/sex-icon.svg"
                  alt="error"
                  width={50}
                  height={50}
                  className="w-4 h-4 md:w-5 md:h-5 mr-4 md:mr-6"
                />
                <span className="text-Text-Main text-sm md:text-base font-medium leading-loose">Gender:</span>
                <span className="text-Text-Main text-sm md:text-base font-normal leading-loose ml-1">{pet?.sex || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <Image
                  src="/img/dashboard/dashboardWeight.svg"
                  alt="error"
                  width={50}
                  height={50}
                  className="w-4 h-4 md:w-5 md:h-5 mr-4 md:mr-6"
                />
                <span className="text-Text-Main text-sm md:text-base font-medium leading-loose">Weight:</span>
                <span className="text-Text-Main text-sm md:text-base font-normal leading-loose ml-1">{pet?.weight || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <Image
                  src="/img/dashboard/dashboardBreed.svg"
                  alt="error"
                  width={50}
                  height={50}
                  className="w-4 h-4 md:w-5 md:h-5 mr-4 md:mr-6"
                />
                <span className="text-Text-Main text-sm md:text-base font-medium leading-loose">Breed:</span>
                <span className="text-Text-Main text-sm md:text-base font-normal leading-loose ml-1">{pet?.breed || "N/A"}</span>
              </div>
              <div className="flex items-center">
                <Image
                  src="/img/dashboard/sterilized-icon.svg"
                  alt="error"
                  width={50}
                  height={50}
                  className="w-4 h-4 md:w-5 md:h-5 mr-4 md:mr-6"
                />
                <span className="text-Text-Main text-sm md:text-base font-medium leading-loose">Sterilized:</span>
                <span className="text-Text-Main text-sm md:text-base font-normal leading-loose ml-1">
                  {pet?.sterilized !== undefined ? (pet.sterilized ? "Yes" : "No") : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* Upcoming Appointment */}
        <div className="bg-white  rounded-xl shadow-md p-4 max-h-72 h-72 mr-[8px] md:mr-0">
          <DashboardMessagesBox />
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl shadow-md p-4 max-h-72 h-72 mr-[8px] md:mr-0">
          <DashboardAppointmentsBox />
        </div>

        {/* Recent Billings */}
        <div className="bg-white rounded-xl shadow-md p-4 max-h-72 h-72 mr-[8px] md:mr-0">
          <DashboardBillingBox />
        </div>
      </div>
    </main>
  );
}
