"use client";

import { SideBarItem } from "@/components/SideBarItem";
import Image from "next/image";
import { useRouter } from 'next/navigation';


interface SideBarContainerProps {
   selectedPage: string;
}


export const SideBarContainer = ({ selectedPage }: SideBarContainerProps) => {
   const router = useRouter();

   const menuItems = [
      { path: "../img/sidebar-options/dashboard.svg", text: "Dashboard", href: "/" },
      { path: "../img/sidebar-options/appointments.svg", text: "Appointments", href: "/appointments" },
      { path: "../img/sidebar-options/message.svg", text: "Message", href: "/message" },
      { path: "../img/sidebar-options/billing.svg", text: "Billing", href: "/billing" },
      { path: "../img/sidebar-options/test-results.svg", text: "Test Results", href: "/test-results" },
      { path: "../img/sidebar-options/immunization.svg", text: "Immunization", href: "/immunization" },
   ];

   const handleClick = (href: string) => {
      // Force a hard reload even if on same page
      if (window.location.pathname === href) {
         window.location.reload();
      } else {
         router.push(href);
      }
   };

   return(
      <aside style={{ width: "250px", height: "auto", padding:"18px"}}>
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
                  isSelected={selectedPage === item.text}
                  onClick={() => handleClick(item.href)}
               />
            ))}
         </div>
      </aside>
   );
};