"use client"

import { Header } from "@/components/MainHeader/Header";
import MainContent from "@/components/Dashboard/MainContent";
import { SideBarContainerVets } from "@/components/MainSideBar/SideBarContainerVets";
import ClientsHeader from "@/components/vet/Clients/ClientsHeader";
import Calendar from "@/components/vet/Calendar";
import { useState } from 'react'

export default function Clients() {

  const [selected, setSelected] = useState("table")


  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerVets selectedPage="Calendar" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
        <Header title="Clients" showSearchBar={false}/>

        <ClientsHeader/>
        <Calendar />
      </div>
    </div>
  );
}


