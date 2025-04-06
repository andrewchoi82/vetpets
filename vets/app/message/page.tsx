"use client";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { Header } from "@/components/MainHeader/Header";
import { SideBarContainer } from "@/components/MainSideBar/SideBarContainer";
import MessageTexting from "@/components/Messages/MessageTexting";
import MessageOverview from "@/components/Messages/MessageOverview";
import MessageCreate from "@/components/Messages/MessageCreate";


import MainContent from "@/components/Dashboard/MainContent";

export default function Message() {
  const [pageState, setPageState] = useState<'overview' | 'create' | 'texting'>('overview');

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainer selectedPage="Messages" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
        <Header title="Messages" />
        <div style={{ flexGrow: 1, padding: "24px" }}>
           {pageState === 'overview' && <MessageOverview setPageState={setPageState} />}
           {pageState === 'create' && <MessageCreate setPageState={setPageState} />}
           {pageState === 'texting' && <MessageTexting />}
         </div>
      </div>
    </div>
  );
}

// export default function Message() {
//   const [pageState, setPageState] = useState<'overview' | 'create' | 'texting'>('overview');

//   return (
//     <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
//       {/* Header */}
//       <Header title="Message" />

//       {/* Body */}
//       <div style={{ display: "flex", flexGrow: 1 }}>
//         {/* Sidebar */}
//         <div style={{ width: "250px", borderRight: "1px solid #e5e5e5" }}>
//           <SideBarContainer selectedPage="Message" />
//         </div>

//         {/* Main Content */}
//         <div style={{ flexGrow: 1, padding: "24px" }}>
//           {pageState === 'overview' && <MessageOverview setPageState={setPageState} />}
//           {pageState === 'create' && <MessageCreate setPageState={setPageState} />}
//           {pageState === 'texting' && <MessageTexting />}
//         </div>
//       </div>
//     </div>
//   );
// }
