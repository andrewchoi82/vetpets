"use client";

import { SideBarItem } from "@/components/SideBarItem";
import Image from "next/image";
import { useState } from "react";

export const SideBarContainer = () => {
   const [selectedItem, setSelectedItem] = useState("Dashboard");
   
   const menuItems = [
      { path: "../img/sidebar-options/dashboard.svg", text: "Dashboard" },
      { path: "../img/sidebar-options/appointments.svg", text: "Appointments" },
      { path: "../img/sidebar-options/message.svg", text: "Message" },
      { path: "../img/sidebar-options/billing.svg", text: "Billing" },
      { path: "../img/sidebar-options/test-results.svg", text: "Test Results" },
      { path: "../img/sidebar-options/immunization.svg", text: "Immunization" },
   ];

   return(
      <aside style={{ width: "180px", height: "auto"}}>
         <div style={{display: "flex", alignItems: "center"}} >
            <Image
               src="/img/vetrail-logo.svg"
               alt="Vetrail Logo"
               width={50}
               height={50}
            />
            <h1 style={{fontFamily:"Sulphur Point", fontSize: "33px", marginTop: "35px", marginLeft: "8px"}}>Vetrail</h1>
         </div> 

         <div style={{ marginTop: "20px" }}>
            {menuItems.map((item) => (
               <SideBarItem
                  key={item.text}
                  path={item.path}
                  text={item.text}
                  isSelected={selectedItem === item.text}
                  onClick={() => setSelectedItem(item.text)}
               />
            ))}
         </div>
      </aside>
   );
};