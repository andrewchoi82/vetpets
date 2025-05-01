"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import { getImageUrl } from "@/app/lib/supabaseGetImage";

export default function GetPet() {
  const [pets, setPets] = useState<any[]>([]);
  const [showPetIdField, setShowPetIdField] = useState(false);
  const [petId, setPetId] = useState("");
  const router = useRouter();
  const currId = Cookies.get("userId");
  const [currUserData, setCurrUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  interface User {
    id: string;  // uuid type
    userType: number;  // smallint type
    firstName: string | null;
    lastName: string | null;
    birthdate: string | null;  // date will come as string
    sex: string | null;
    phoneNumber: number | null;  // bigint type
    email: string | null;
    contactPreference: string | null;
    address: string | null;
    username: string | null;
    profilePic: string | null;
}


  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (currId) {
          fetch(`/api/pets/petsByUser?userId=${currId}`)
            .then((res) => res.json())
            .then((data) => setPets(data))
            .catch((err) => console.error("Error fetching pets:", err));
        }

        const res2 = await fetch(`/api/me?userId=${currId}`, {
          method: 'GET',
        });
        const userCurr = await res2.json();
        setCurrUserData(userCurr);
      }
      catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div style={{
          position: "relative",
          width: "80px",
          height: "80px"
        }}>
          <Image
            src="/img/vetrail-logo.svg"
            alt="Loading..."
            fill
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
    );
  }

  const handlePetSelection = (petId: number) => {
    Cookies.set("petId", petId.toString(), { expires: 7 });
    router.push("/");
  };

  const handleAddNewPet = () => {
    router.push("/createpet");
  };

  const handleSubmitPetId = async () => {
    if (!petId.trim()) return alert("Enter a valid Pet ID");
    try {
      const res = await fetch(`/api/pet-creation?requestId=${petId}&userId=${currId}`);
      const data = await res.json();
      if (!res.ok || !data.petId) throw new Error(data.error || "Pet creation failed");
      Cookies.set("petId", data.petId.toString(), { expires: 7 });
      router.push("/");
    } catch (err: any) {
      alert(`Failed to create pet: ${err.message}`);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 264, behavior: "smooth" }); // 240px + 24px gap
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -264, behavior: "smooth" }); // 240px + 24px gap
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-[145px] bg-white relative">
      {/* Fixed Logo */}
      <div style={{ position: "fixed", top: "20px", left: "10px", zIndex: 110, width: "150px", height: "38px" }}>
        <div style={{ width: "150px", height: "38px", position: "relative" }}>
          <Image
            src="/img/vetrail-logo-with-text.svg"
            alt="Vetrail Logo"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Welcome Section */}
      <div className="flex flex-col items-center mb-[20px]">
        <Image src="/img/paw.svg" width={48} height={48} alt="Paw Icon" className="mb-[22px]" />
        <h1 className="text-3xl font-semibold text-gray-900 mb-[20px]">{"Welcome, " + currUserData?.firstName + "!"}</h1>
        <button
          onClick={handleAddNewPet}
          className="px-4 py-2 rounded-full text-sm bg-white text-gray-900 border border-gray-300 hover:bg-gray-100 hover:cursor-pointer"
        >
          {showPetIdField ? "Cancel" : "+ Add pet"}
        </button>
      </div>

      {/* Pet ID Input */}
      {showPetIdField && (
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
            placeholder="Enter Pet ID"
            className="px-4 py-2 rounded-md border border-gray-300 w-64"
          />
          <button
            onClick={handleSubmitPetId}
            className="px-4 py-2 rounded-md text-white transition-colors"
            style={{
              backgroundColor: "#004d81",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#003a60")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#004d81")}
          >
            Submit
          </button>
        </div>
      )}

      {/* Pet List with Scroll Buttons */}
      <div className="relative w-[520px] max-w-full pt-4">
        {/* Scrollable Row with hover space */}
        <div
          ref={scrollRef}
          className="overflow-x-auto"
          style={{
            paddingTop: "16px",
            paddingBottom: "20px", // pushes scrollbar further down
            marginTop: "-16px",
            overflowY: "visible",
          }}
        >
          <style jsx>{`
    .overflow-x-auto::-webkit-scrollbar {
      height: 4px;
      margin-top: 12px; /* not all browsers respect this */
    }

    .overflow-x-auto::-webkit-scrollbar-track {
      background: transparent;
    }

    .overflow-x-auto::-webkit-scrollbar-thumb {
      background-color: rgba(0, 0, 0, 0.2);
      border-radius: 10px;
    }

    .overflow-x-auto::-webkit-scrollbar-thumb:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }

    .overflow-x-auto {
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
    }
  `}</style>

          <div className="flex gap-6 px-2 pb-2" style={{ overflowY: "visible" }}>
            {pets.map((pet) => (
              <div
                key={pet.petId}
                onClick={() => handlePetSelection(pet.petId)}
                className="w-[240px] h-[240px] flex-shrink-0 cursor-pointer transition-transform duration-200 ease-in-out hover:scale-105 hover:-translate-y-1 relative group"
                style={{ overflowY: "visible" }}
              >
                <div className="w-full h-full rounded-[10px] shadow-md overflow-hidden relative">
                  <Image
                    src={(!pet.pet_picture || pet.pet_picture==="") ? "/img/message/doggg.png" : getImageUrl(pet.pet_picture)}
                    alt={pet.name}
                    width={240}
                    height={240}
                    className="object-cover w-full h-full"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                    <span className="text-white text-xl font-medium">{pet.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Left Arrow Button */}
        <button
          onClick={scrollLeft}
          className="absolute left-[-45px] top-[50%] translate-y-[-50%] hover:opacity-80"
          style={{ zIndex: 20 }}
        >
          <Image
            src="/img/getPets/slider-arrow.svg"
            alt="Scroll Left"
            width={24}
            height={24}
            style={{ transform: 'rotate(180deg)' }}
          />
        </button>

        {/* Scroll Right Arrow Button */}
        <button
          onClick={scrollRight}
          className="absolute right-[-45px] top-[50%] translate-y-[-50%] hover:opacity-80"
          style={{ zIndex: 20 }}
        >
          <Image
            src="/img/getPets/slider-arrow.svg"
            alt="Scroll Right"
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
}
