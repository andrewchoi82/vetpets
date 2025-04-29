"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { SideBarItem } from "@/components/MainSideBar/SideBarItem";

export interface SideBarContainerProps {
  selectedPage: string;
}

interface MenuItem {
  path: string;
  text: string;
  href: string;
  notificationCount?: number;
}

export const SideBarContainerVets = ({ selectedPage }: SideBarContainerProps) => {
  const router = useRouter();
  const [isContainerHovered, setIsContainerHovered] = useState<boolean>(false);
  const [currentSelected, setCurrentSelected] = useState<string>(selectedPage);

  const pathToName: Record<string, string> = {
    "/vet/": "Clients",
    "/vet/messages": "Messages",
    "/vet/calendar": "Calendar",
    "/vet/settings": "Settings",
  };

  useEffect(() => {
    const currentPath = window.location.pathname;
    if (pathToName[currentPath]) {
      setCurrentSelected(pathToName[currentPath]);
    }
  }, []);

  const menuItems: MenuItem[] = [
    { path: "/img/vet/sidebar-options/nonSelectedVersion/clients.svg", text: "Clients", href: "/vet/" },
    { path: "/img/vet/sidebar-options/nonSelectedVersion/messages.svg", text: "Messages", href: "/vet/messages", notificationCount: 2 },
    { path: "/img/vet/sidebar-options/nonSelectedVersion/calendar.svg", text: "Calendar", href: "/vet/calendar" },
    { path: "/img/sidebar-options/nonSelectedVersion/settings.svg", text: "Settings", href: "/vet/settings" },
  ];

  const handleClick = (href: string, text: string): void => {
    setCurrentSelected(text);
    if (window.location.pathname === href) {
      window.location.reload();
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <div style={{ position: "fixed", top: "20px", left: "10px", zIndex: 110, width: "90px", height: "22px" }}>
        <div style={{ width: "90px", height: "22px", position: "relative" }}>
          <Image 
            src="/img/vetrail-logo.svg" 
            alt="Vetrail Logo" 
            fill 
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      <aside
        onMouseEnter={() => setIsContainerHovered(true)}
        onMouseLeave={() => setIsContainerHovered(false)}
        style={{
          width: "50px",
          height: "calc(100vh - 150px)",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          backgroundColor: "#F9FAFB",
          borderRadius: "20px",
          margin: "20px 0 20px 20px",
          boxShadow: isContainerHovered
            ? "0px 5px 20px rgba(0, 0, 0, 0.16), inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.04)"
            : "0px 4px 20px rgba(0, 0, 0, 0.15), inset 0 0 0 1px rgba(255, 255, 255, 0.8), 0 0 0 1px rgba(0, 0, 0, 0.04)",
          position: "fixed",
          left: "20px",
          top: isContainerHovered ? "49.5px" : "50px",
          zIndex: 100,
          padding: "24px 0",
          transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          transform: isContainerHovered ? "scale(1.005)" : "scale(1)",
          transformOrigin: "center",
        }}
      >
        <div style={{ 
          gridRow: "1", 
          display: "flex", 
          flexDirection: "column", 
          width: "100%",
          paddingTop: "10px"
        }}>
          {menuItems.map((item) => (
            <SideBarItem
              key={item.text}
              path={item.path}
              text={item.text}
              isSelected={currentSelected === item.text}
              onClick={() => handleClick(item.href, item.text)}
              notificationCount={item.notificationCount || 0}
            />
          ))}
        </div>

        <div style={{ gridRow: "2" }}></div>

        <div style={{ gridRow: "3" }}></div>
      </aside>
    </>
  );
};
