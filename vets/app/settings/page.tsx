"use client"

import { Header } from "@/components/MainHeader/Header";
import { SideBarContainer } from "@/components/MainSideBar/SideBarContainer";
import { useState } from "react";
import BasicInfoContainer from "@/components/Settings/BasicInfoContainer";
import { Basic } from "next/font/google";
import PersonalInfoContainer from "@/components/Settings/PersonalInfoContainer";
import AccountInfo from "@/components/Settings/AccountInfo";


export default function Settings() {

   return (
       <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
         <SideBarContainer selectedPage="Settings"/>
   
         <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
            <Header title="Settings" />
            <BasicInfoContainer style={{marginTop: "20px", marginLeft: "20px"}} profileImg="/img/header/doge.png" fullName="Jane Doe" birthday="Janurary 01, 2000" gender="Female"></BasicInfoContainer>
            <PersonalInfoContainer style={{marginTop: "20px", marginLeft: "20px"}} phoneNumber="424-628-3290" email="janedoe@gmail.com" contactPref="Text" address="3201 Hoover St, Los Angeles, CA 90007"/>
            <AccountInfo style={{marginTop: "20px", marginBottom: "20px", marginLeft: "20px"}} username="janedoe@gmail.com" password="**********"/>
         </div>
       </div>
   );
}