"use client"

import Image from "next/image";
import { SearchBar } from "./SearchBar";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  title: string;
  showSearchBar: boolean;
}

export const Header = ({ title, showSearchBar }: HeaderProps) => {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current && 
        !popupRef.current.contains(event.target as Node) &&
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setShowProfilePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSwitchPet = () => {
    console.log("Switch pet profile clicked");
    setShowProfilePopup(false);
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
            src="/img/header/doge.png"
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
                  <div style={{ fontSize: "16px", color: "#374151", fontWeight: "500" }}>Jane Doe</div>
                  <div style={{ fontSize: "14px", color: "#6B7280" }}>Snowball</div>
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
        </div>
      </div>
    </header>
  );
};
