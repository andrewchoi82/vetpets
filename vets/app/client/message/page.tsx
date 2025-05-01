"use client";

import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { Header } from "@/components/MainHeader/Header";
import { SideBarContainerClient } from "@/components/MainSideBar/SideBarContainerClient";
import MessagesSide from "@/components/Messages/MessagesSide";

type PageState =
  | { view: 'overview' }
  | { view: 'create' }
  | { view: 'texting'; conversationId: number };

export default function Message() {
  const [pageState, setPageState] = useState<PageState>({ view: 'overview' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800); // Replace with real fetch trigger if needed
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
        <SideBarContainerClient selectedPage="Messages" />
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

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerClient selectedPage="Messages" />
      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column", 
        background: "#fff", 
        overflow: "hidden",
        marginLeft: "120px" 
      }}>
        <Header title="Messages" showSearchBar={true} />
        <div style={{ flex: 1, overflow: "hidden" }}>
          {pageState.view === 'overview' && (
            <MessagesSide setPageState={setPageState} />
          )}
        </div>
      </div>
    </div>
  );
}
1