"use client";
import { HeaderNew } from "@/components/MainHeader/HeaderNew";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import { useEffect, useState } from "react";
import BasicInfoContainer from "@/components/Settings/BasicInfoContainer";
import PersonalInfoContainer from "@/components/Settings/PersonalInfoContainer";
import AccountInfo from "@/components/Settings/AccountInfo";
import { getImageUrl as getStorageImageUrl } from '@/app/lib/supabaseGetImage';
import Cookies from 'js-cookie';
import Image from "next/image";

export default function SettingsClient() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState<boolean | null>(null);
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

  const handleUpdateField = async (field: string, value: string) => {
    console.log(`Updating ${field} to ${value}`);
    
    // To handle the fullName field which is split into first and last name
    let updateData: any = {};
    
    if (field === 'fullName') {
      const [firstName, lastName] = value.split(' ');
      updateData = { firstName, lastName };
    } else if (field === 'contactPref') {
      updateData = { contactPreference: value };
    } else if (field === 'birthday') {
      updateData = { birthdate: value };
    } else {
      updateData = { [field]: value };
    }

    try {
      console.log('Sending update with data:', updateData);
      
      // Use the correct API endpoint path
      const res = await fetch(`/api/users/${currId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error('Update response not OK:', res.status, errorText);
        throw new Error(`Status ${res.status}: ${errorText}`);
      }

      const result = await res.json();
      console.log('Update result:', result);
      
      if (result.success) {
        // Update local state to reflect changes
        setUserData((prev : any) => ({
          ...prev,
          ...updateData
        }));
        setUpdateSuccess(true);
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setUpdateSuccess(null);
        }, 3000);
      } else {
        console.error('Update failed:', result.error);
        setUpdateSuccess(false);
        setTimeout(() => {
          setUpdateSuccess(null);
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating user data:", error);
      setUpdateSuccess(false);
      setTimeout(() => {
        setUpdateSuccess(null);
      }, 3000);
    }
  };

  if (loading) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerClient selectedPage="Settings" />
      
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
  

  if (!userData) {
    return <div>Failed to load user data.</div>;
  }

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerClient selectedPage="Settings" />

      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        background: "#fff", 
        overflowY: "auto",
        marginLeft: "120px" // Add margin to avoid overlap with the sidebar
      }}>
        <HeaderNew title="" showSearchBar={true} />
        
        {updateSuccess !== null && (
          <div 
            style={{ 
              padding: "10px", 
              margin: "10px 20px", 
              borderRadius: "5px",
              backgroundColor: updateSuccess ? "#dcfce7" : "#fee2e2",
              color: updateSuccess ? "#166534" : "#b91c1c",
              textAlign: "center"
            }}
          >
            {updateSuccess ? "Successfully updated your information!" : "Failed to update information. Please try again."}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", marginTop: "20px", marginLeft: "20px" }}>
          <div style={{ fontSize: 22, fontWeight: 500 }}>Profile</div>
          <Image
            src="/img/paw.svg"
            alt="Paw Icon"
            width={20}
            height={20}
            style={{ marginLeft: 9 }}
          />
        </div>
        
        <BasicInfoContainer
          style={{ marginTop: "20px", marginLeft: "20px" }}
          profileImg={userData.profilePic ? getStorageImageUrl(userData.profilePic) : "/img/header/doge.png"}
          fullName={`${userData.firstName} ${userData.lastName}`}
          birthday={userData.birthdate} 
          sex={userData.sex}
          onUpdate={handleUpdateField}
        />
        <PersonalInfoContainer
          style={{ marginTop: "20px", marginLeft: "20px" }}
          phoneNumber={userData.phoneNumber}
          email={userData.email}
          contactPref={userData.contactPreference}
          address={userData.address}
          onUpdate={handleUpdateField}
        />
        <AccountInfo
          style={{ marginTop: "20px", marginBottom: "20px", marginLeft: "20px" }}
          username={userData.username}
          password="**********" // DO NOT fetch or show real password!
          onUpdate={handleUpdateField}
        />
      </div>
    </div>
  );
}