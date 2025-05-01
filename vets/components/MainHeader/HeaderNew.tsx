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
  userType: number;
}

export const HeaderNew = ({ title, showSearchBar }: HeaderProps) => {
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
        justifyContent: "end",
        width: "100%",
        backgroundColor: "#fff"
      }}
    >

      <div style={{ display: "flex", alignItems: "center", gap: "20px", marginTop: "40px" ,marginRight: "5%"}}>
        <SearchBar />

        <div className="w-10 h-10 px-3 py-2.5 rounded-3xl outline outline-1 outline-offset-[-1px] outline-neutral-200 inline-flex justify-center items-center gap-2.5 relative">
          <div className="absolute w-1.5 h-1.5 bg-red-500 rounded-full top-3 right-3"></div>
          <Image
            src="/img/header/reminder-icon.svg"
            alt="Reminder Icon"
            width={27}
            height={27}
          />
        </div>


      </div>
    </header>
  );
};
