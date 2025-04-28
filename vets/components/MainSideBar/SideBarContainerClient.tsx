"use client";

import { SideBarItem } from "@/components/MainSideBar/SideBarItem";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SideBarContainerProps {
  selectedPage: string;
}

export const SideBarContainerClient = ({ selectedPage }: SideBarContainerProps) => {
  const router = useRouter();

  const topMenuItems = [
    { path: "/img/sidebar-options/nonSelectedVersion/dashboard.svg", text: "Dashboard", href: "/" },
    { path: "/img/sidebar-options/nonSelectedVersion/messages.svg", text: "Messages", href: "/client/message", notificationCount: 2 },
    { path: "/img/sidebar-options/nonSelectedVersion/appointments.svg", text: "Appointments", href: "/client/appointments" },
    { path: "/img/sidebar-options/nonSelectedVersion/health-records.svg", text: "Health records", href: "/client/health-records" },
    { path: "/img/sidebar-options/nonSelectedVersion/billing.svg", text: "Billings", href: "/client/billings" }
  ];

  const settingsItem = [
    { path: "/img/sidebar-options/nonSelectedVersion/settings.svg", text: "Settings", href: "/client/settings" }
  ];

  const handleClick = (href: string) => {
    if (window.location.pathname === href) {
      window.location.reload();
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <div style={{ position: "fixed", top: "20px", left: "10px", zIndex: 110 }}>
        <Image src="/img/vetrail-logo-with-text.svg" alt="Vetrail Logo" width={120} height={30} />
      </div>
      <aside
        style={{
          width: "50px",
          height: "calc(100vh - 150px)",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          margin: "20px 0 20px 20px",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.04)",
          position: "fixed",
          left: 20,
          top: 50,
          zIndex: 100,
          padding: "24px 0"
        }}
      >
        <div style={{ 
          gridRow: "1", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center" 
        }}>
          {topMenuItems.map((item) => (
            <SideBarItem
              key={item.text}
              path={item.path}
              text={item.text}
              isSelected={selectedPage === item.text}
              onClick={() => handleClick(item.href)}
              notificationCount={item.notificationCount || 0}
              iconsOnly={true}
            />
          ))}
        </div>
        
        {/* middle section of empty space - probs not the best way to do this but j hardcoded for speed */}
        <div style={{ gridRow: "2" }}></div>
        
        <div style={{ 
          gridRow: "3", 
          display: "flex", 
          flexDirection: "column", 
          alignItems: "center" 
        }}>
          {settingsItem.map((item) => (
            <SideBarItem
              key={item.text}
              path={item.path}
              text={item.text}
              isSelected={selectedPage === item.text}
              onClick={() => handleClick(item.href)}
              iconsOnly={true}
            />
          ))}
        </div>
      </aside>
    </>
  );
};
