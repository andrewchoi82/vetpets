"use client";
import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import { useEffect, useState } from "react";
import BasicInfoContainer from "@/components/Settings/BasicInfoContainer";
import PersonalInfoContainer from "@/components/Settings/PersonalInfoContainer";
import AccountInfo from "@/components/Settings/AccountInfo";

export default function SettingsClient() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/me", { credentials: "include" });
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (!userData) {
    return <div>Failed to load user data.</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerClient selectedPage="Settings" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
        <Header title="Settings" showSearchBar={true} />
        <BasicInfoContainer
          style={{ marginTop: "20px", marginLeft: "20px" }}
          profileImg={userData.profilePic || "/img/header/doge.png"}
          fullName={`${userData.firstName} ${userData.lastName}`}
          birthday={new Date(userData.birthdate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          gender={userData.gender}
        />
        <PersonalInfoContainer
          style={{ marginTop: "20px", marginLeft: "20px" }}
          phoneNumber={userData.phoneNumber}
          email={userData.email}
          contactPref={userData.contactPreference}
          address={userData.address}
        />
        <AccountInfo
          style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "20px" }}
          username={userData.username}
          password="**********" // DO NOT fetch or show real password!
        />
      </div>
    </div>
  );
}
