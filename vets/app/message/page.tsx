"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { Header } from "@/components/MainHeader/Header";
import { SideBarContainer } from "@/components/MainSideBar/SideBarContainer";
import MessageTexting from "@/components/Messages/MessageTexting";
import MessageOverview from "@/components/Messages/MessageOverview";
import MessageCreate from "@/components/Messages/MessageCreate";
import MessagesSide from "@/components/Messages/MessagesSide";
import MessageText from "@/components/Messages/MessageText";


import MainContent from "@/components/Dashboard/MainContent";
type PageState =
  | { view: 'overview' }
  | { view: 'create' }
  | { view: 'texting'; conversationId: number };

export default function Message() {
  
  const [pageState, setPageState] = useState<PageState>({ view: 'overview' });

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainer selectedPage="Messages" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflow: "hidden" }}>
        <Header title="Messages" />
        <div style={{ flex: 1, overflow: "hidden" }}>
        {pageState.view === 'overview' && (
            <MessagesSide setPageState={setPageState} />
          )}
         </div>
      </div>
    </div>
  );
}