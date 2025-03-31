"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react'
import { Header } from "@/components/Header";
import { SideBarContainer } from "@/components/SideBarContainer";
import  MessageTexting  from "@/components/MessageTexting";
import  MessageOverview  from "@/components/MessageOverview";
import  MessageCreate  from "@/components/MessageCreate";


import DashboardSmallBox from "@/components/dashboardSmallBox"

export default function Message() {

   {/*  3 states for the overview of all messages, createing new message, and texing. Each will bring up a different component/modal */}
  const [pageState, setPageState] = useState<'overview' | 'create' | 'texting'>('overview');

  return (

    <div>
      {/* Header */}
      <Header title="Message" />

      {/* Side Bar */}
      <SideBarContainer selectedPage="Message"/>

      {/* Main Page */}
      {pageState === 'overview' && <MessageOverview setPageState={setPageState}/>}
      {pageState === 'create' && <MessageCreate setPageState={setPageState}/>}
      {pageState === 'texting' && <MessageTexting />}

    </div>
  );
}
