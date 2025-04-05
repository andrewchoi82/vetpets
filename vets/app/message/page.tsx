"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import { Header } from "@/components/Header";
import { SideBarContainer } from "@/components/SideBar/SideBarContainer";
import  MessageTexting  from "@/components/MessageComponents/MessageTexting";
import  MessageOverview  from "@/components/MessageComponents/MessageOverview";
import  MessageCreate  from "@/components/MessageComponents/MessageCreate";


import DashboardSmallBox from "@/components/DashboardComponents/dashboardSmallBox"

export default function Message() {

   {/*  3 states for the overview of all messages, createing new message, and texing. Each will bring up a different component/modal */}
  const [pageState, setPageState] = useState<'overview' | 'create' | 'texting'>('overview');

  return (

    <div >
      {/* Header */}
      <Header title="Message" />

      <div className="flex">
        {/* Side Bar */}
        <SideBarContainer selectedPage="Message"/>

        {/* Main Page */}
        
        {pageState === 'overview' && <MessageOverview setPageState={setPageState}/>}
        {pageState === 'create' && <MessageCreate setPageState={setPageState}/>}
        {pageState === 'texting' && <MessageTexting />}
      </div>

    </div>
  );
}
