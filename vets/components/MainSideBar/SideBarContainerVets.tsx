"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { SideBarItem } from "@/components/MainSideBar/SideBarItem";
import { getImageUrl as getStorageImageUrl } from '@/app/lib/supabaseGetImage';
import Cookies from 'js-cookie';

export interface SideBarContainerProps {
  selectedPage: string;
}

interface MenuItem {
  path: string;
  text: string;
  href: string;
  notificationCount?: number;
}

export const SideBarContainerVets = ({ selectedPage }: SideBarContainerProps) => {
  const router = useRouter();
  const [isContainerHovered, setIsContainerHovered] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<string>(selectedPage);
  const [userData, setUserData] = useState<any>(null);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const currId = Cookies.get("userId");
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const pathToName: Record<string, string> = {
    "/vet/": "Clients",
    "/vet/messages": "Messages",
    "/vet/calendar": "Calendar",
    "/vet/settings": "Settings",
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (pathToName[currentPath]) {
      setCurrentSelected(pathToName[currentPath]);
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/me?userId=${currId}`);
        const user = await res.json();
        setUserData(user);
      } catch (err) {
        console.error("Failed to fetch user:", err);
      } finally {
        setIsUserDataLoading(false);
      }
    };
  
    if (currId) {
      fetchUserData();
    }
  }, [currId]);

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

  const menuItems: MenuItem[] = [
    { path: "/img/vet/sidebar-options/nonSelectedVersion/clients.svg", text: "Clients", href: "/vet/" },
    { path: "/img/vet/sidebar-options/nonSelectedVersion/messages.svg", text: "Messages", href: "/vet/messages", notificationCount: 2 },
    { path: "/img/vet/sidebar-options/nonSelectedVersion/calendar.svg", text: "Calendar", href: "/vet/calendar" },
  ];

  const handleClick = (href: string, text: string): void => {
    setCurrentSelected(text);
    if (window.location.pathname === href) {
      window.location.reload();
    } else {
      router.push(href);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
  
      if (res.ok) {
        window.location.href = "/login";
      } else {
        alert("Failed to log out.");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  
    setShowProfilePopup(false);
  };

  return (
    <>
      <div style={{ position: "fixed", top: "20px", left: "10px", zIndex: 110, width: "120px", height: "30px" }}>
        <div style={{ width: "120px", height: "30px", position: "relative" }}>
          <Image 
            src="/img/vetrail-logo-with-text.svg" 
            alt="Vetrail Logo" 
            fill 
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <aside
        onMouseEnter={() => setIsContainerHovered(true)}
        onMouseLeave={() => setIsContainerHovered(false)}
        style={{
          width: "50px",
          height: "calc(100vh - 150px)",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          backgroundColor: "#F9FAFB",
          borderRadius: "20px",
          margin: "20px 0 20px 20px",
          boxShadow: isContainerHovered
            ? "0px 5px 20px rgba(0, 0, 0, 0.16), inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.04)"
            : "0px 4px 20px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.04)",
          position: "fixed",
          left: "20px",
          top: isContainerHovered ? "49.5px" : "50px",
          zIndex: 100,
          padding: "24px 0",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isContainerHovered ? "scale(1.005)" : "scale(1)",
          transformOrigin: "center",
        }}
      >
        <div style={{ 
          gridRow: "1", 
          display: "flex", 
          flexDirection: "column", 
          width: "100%",
          paddingTop: "10px"
        }}>
          {menuItems.map((item) => (
            <SideBarItem
              key={item.text}
              path={item.path}
              text={item.text}
              isSelected={currentSelected === item.text}
              onClick={() => handleClick(item.href, item.text)}
              notificationCount={item.notificationCount || 0}
            />
          ))}
        </div>

        <div style={{ gridRow: "2" }}></div>

        <div style={{ 
          gridRow: "3", 
          display: "flex", 
          flexDirection: "column", 
          width: "100%",
          paddingBottom: "10px",
          marginTop: "auto"
        }}>
          <div
            onClick={() => setShowProfilePopup(!showProfilePopup)}
            ref={profileRef}
            style={{
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              overflow: "hidden",
              margin: "0 auto",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: currentSelected === "Settings"
                ? "2px solid #0A4B94"
                : isContainerHovered
                ? "1.5px solid #0A4B94"
                : "none",
              backgroundColor: currentSelected === "Settings" ? "#E8F0FE" : "transparent",
              transition: "border 0.2s ease-in-out, background-color 0.2s ease-in-out"
            }}
          >
            {isUserDataLoading ? (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#D3D3D3"
                }}
              />
            ) : userData?.profilePic ? (
              <Image
                src={getStorageImageUrl(userData.profilePic)}
                alt="Profile Picture"
                width={28}
                height={28}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  backgroundColor: "#D3D3D3"
                }}
              />
            )}
          </div>
        </div>
      </aside>

      {showProfilePopup && (
        <div 
          ref={popupRef}
          style={{ 
            position: "fixed",
            top: "calc(100vh - 100px - 60px)",
            left: "100px",
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
          <div 
            style={{ 
              padding: "16px", 
              display: "flex", 
              alignItems: "center", 
              gap: "12px",
              cursor: "pointer"
            }}
            onClick={() => {
              setShowProfilePopup(false);
              router.push("/vet/settings");
            }}
          >
            <div style={{ fontSize: "16px", color: "#374151", fontWeight: "500" }}>
              {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
            </div>
            <div style={{ fontSize: "14px", color: "#6B7280" }}>
              Veterinarian
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
            onClick={handleLogout}
          >
            <div style={{ fontSize: "16px", color: "#374151" }}>Log out</div>
          </div>
        </div>
      )}
    </>
  );
};
