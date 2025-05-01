"use client"

import { HeaderNew } from "@/components/MainHeader/HeaderNew";
import MainContent from "@/components/Dashboard/MainContent";
import { SideBarContainerVets } from "@/components/MainSideBar/SideBarContainerVets";
import ClientsHeader from "@/components/vet/Clients/ClientsHeader";
import ClientsTable from "@/components/vet/Clients/ClientsTable";
import PetTable from "@/components/vet/Pets/PetTable";

import { ClientsProfile } from "@/components/vet/Clients/ClientsProfile";
import { useState } from 'react'

export default function Clients() {

  const [selected, setSelected] = useState("table")


  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          <SideBarContainerVets selectedPage="Clients" />
    
          <div style={{ 
            flex: 1, 
            display: "flex", 
            flexDirection: "column", 
            background: "#fff", 
            overflowY: "auto",
            marginLeft: "120px" 
          }}>
            <HeaderNew title="Clients" showSearchBar={false}/>
    
            <PetTable selected={selected} setSelected={setSelected}/>          </div>
        </div>
  );
}


