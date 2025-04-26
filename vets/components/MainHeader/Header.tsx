"use client"

import Image from "next/image";
import { SearchBar } from "./SearchBar";
import { useState, useRef, useEffect } from "react";
import Cookies from 'js-cookie';
import { getImageUrl as getStorageImageUrl } from '@/app/lib/supabaseGetImage';

interface HeaderProps {
  title: string;
  showSearchBar: boolean;
}

interface Pet {
  petId: number;
  pet_picture: string;
  breed: string;
  age: string;
  weight: number;
  gender: string;
  sterilized: boolean;
  birthdate: string;
  name: string;
  userId: string;
  doctorId: string;
}

interface User {
  id: string;
  firstName: string;
  lastName: string;
  profilePic: string | null;
}

export const Header = ({ title, showSearchBar }: HeaderProps) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showPetPopup, setShowPetPopup] = useState(false);
  const [pets, setPets] = useState<Pet[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const petPopupRef = useRef<HTMLDivElement>(null);

  const currId = Cookies.get('userId');

  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      if (currId) {
        try {
          const res = await fetch(`/api/me?userId=${currId}`, {
            method: 'GET',
          });
          const userData = await res.json();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [currId]);

  // Fetch pets when component mounts
  useEffect(() => {
    if (currId) {
      fetch(`/api/pets/petsByUser?userId=${currId}`)
        .then(response => response.json())
        .then(data => {
          setPets(data);
        })
        .catch(error => {
          console.error("Error fetching pets:", error);
        });
    }
  }, [currId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node) &&
        petPopupRef.current &&
        !petPopupRef.current.contains(event.target as Node)
      ) {
        setShowProfilePopup(false);
        setShowPetPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSwitchPet = () => {
    setShowPetPopup(true);
  };

  const handlePetSelection = (petId: number) => {
    const selectedPet = pets.find(pet => pet.petId === petId);
    if (selectedPet) {
      Cookies.set('petId', petId.toString(), { expires: 7 });
      setShowPetPopup(false);
      setShowProfilePopup(false);
      // Reload the page to reflect the new pet selection
      window.location.reload();
    }
  };

  const handleAddNewPet = () => {
    console.log("Add new pet clicked");
    setShowProfilePopup(false);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (res.ok) {
        window.location.href = "/login"; // ✅ Only redirect after clearing the cookie
      } else {
        alert("Failed to log out.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  
    setShowProfilePopup(false); // Close the popup
  };
  


  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: "40px 30px",
        paddingTop: "40px",
        paddingBottom: "20px",

        borderBottom: "1px solid #E5E5E5",
        backgroundColor: "#fff",
      }}
    >
      <h1 style={{ fontSize: "30px", fontWeight: "500" }}>{title}</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {showSearchBar && <SearchBar />}

        <Image
          src="/img/header/reminder-icon.svg"
          alt="Reminder Icon"
          width={24}
          height={24}
        />

        <div style={{ position: "relative" }} ref={profileRef}>
          <Image
            src={user?.profilePic ? getStorageImageUrl(user.profilePic) : "/img/header/doge.png"}
            alt="Profile Picture"
            width={40}
            height={40}
            style={{
              objectFit: "cover",
              borderRadius: "50%",
              overflow: "hidden",
              aspectRatio: "1/1",
              cursor: "pointer",
            }}
            onClick={() => setShowProfilePopup(!showProfilePopup)}
          />
          
          {showProfilePopup && (
            <div 
              ref={popupRef}
              style={{ 
                position: "absolute", 
                top: "45px", 
                right: "0", 
                zIndex: 10,
                width: "240px",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "4px 4px 4px 0px rgba(0,0,0,0.10)",
                border: "1px solid #E5E5E5",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ padding: "16px", display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ fontSize: "16px", color: "#374151", fontWeight: "500" }}>
                    {user ? `${user.firstName} ${user.lastName}` : 'Loading...'}
                  </div>
                  <div style={{ fontSize: "14px", color: "#6B7280" }}>
                    {pets.find(pet => pet.petId.toString() === Cookies.get('petId'))?.name || 'No pet selected'}
                  </div>
              </div>
              <div style={{ height: "1px", width: "100%", backgroundColor: "#E5E5E5" }} />
              
              <div 
                style={{ 
                  padding: "12px 16px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "12px",
                  cursor: "pointer"
                }}
                onClick={handleSwitchPet}
              >
                <div style={{ fontSize: "16px", color: "#374151" }}>Switch Pets</div>
              </div>

              <div style={{ height: "1px", width: "100%", backgroundColor: "#E5E5E5" }} />
              
              <div 
                style={{ 
                  padding: "12px 16px", 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "12px",
                  cursor: "pointer"
                }}
                onClick={handleLogout}
              >
                <div style={{ fontSize: "16px", color: "#374151" }}>Log out</div>
              </div>
            </div>
          )}

          {showPetPopup && (
            <div 
              ref={petPopupRef}
              style={{ 
                position: "absolute",
                top: "45px",
                right: "260px", // Position to the left of the profile popup
                zIndex: 10,
                width: "200px",
                backgroundColor: "white",
                borderRadius: "5px",
                boxShadow: "4px 4px 4px 0px rgba(0,0,0,0.10)",
                border: "1px solid #E5E5E5",
                display: "flex",
                flexDirection: "column"
              }}
            >
              {pets.map((pet) => (
                <div 
                  key={pet.petId}
                  style={{ 
                    padding: "12px 16px",
                    cursor: "pointer",
                    borderBottom: "1px solid #E5E5E5",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "#F3F4F6"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#F3F4F6"}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "white"}
                  onClick={() => handlePetSelection(pet.petId)}
                >
                  <div style={{ fontSize: "16px", color: "#374151" }}>{pet.name}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
