"use client";
import { Header } from "@/components/MainHeader/Header";
import { useEffect, useState } from "react";
import BasicInfoContainer from "@/components/Settings/BasicInfoContainer";
import PersonalInfoContainer from "@/components/Settings/PersonalInfoContainer";
import AccountInfo from "@/components/Settings/AccountInfo";
import { SideBarContainerVets } from "../MainSideBar/SideBarContainerVets";
import Cookies from 'js-cookie';
import { getImageUrl as getStorageImageUrl } from '@/app/lib/supabaseGetImage';

export default function SettingsVet() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const currId = Cookies.get('userId');


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res1 = await fetch(`/api/me?userId=${currId}`, {
          method: 'GET',
      });
      const user = await res1.json();
      setUserData(user);
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
      <SideBarContainerVets selectedPage="Settings" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
        <Header title="Settings" showSearchBar={true} />
        <BasicInfoContainer
          style={{ marginTop: "20px", marginLeft: "20px" }}
          profileImg={userData.profilePic ? getStorageImageUrl(userData.profilePic) : "/img/header/doge.png"}
          fullName={`${userData.firstName} ${userData.lastName}`}
          birthday={new Date(userData.birthdate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
          sex={userData.sex}
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
