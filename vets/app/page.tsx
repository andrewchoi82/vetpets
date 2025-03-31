"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import { Header } from "@/components/Header";
import { SideBarContainer } from "@/components/SideBarContainer";
import  MainContent  from "@/components/MainContent";


export default function Home() {


  return (

    <div>
      {/* Header */}
      <Header title="Dashboard"/>

      {/* Side Bar */}
      <SideBarContainer selectedPage="Dashboard"/>

      {/* Main Page */}
      <MainContent/>

    </div>
  );
}