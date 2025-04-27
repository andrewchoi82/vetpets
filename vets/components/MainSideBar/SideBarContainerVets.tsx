"use client";

import { SideBarItem } from "@/components/MainSideBar/SideBarItem";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SideBarContainerProps {
  selectedPage: string;
}

export const SideBarContainerVets = ({ selectedPage }: SideBarContainerProps) => {
  const router = useRouter();

  const menuItems = [
    { path: "/img/vet/sidebar-options/nonSelectedVersion/clients.svg", text: "Clients", href: "/vet/" },
    { path: "/img/vet/sidebar-options/nonSelectedVersion/messages.svg", text: "Messages", href: "/vet/messages", notificationCount: 2 },
    { path: "/img/vet/sidebar-options/nonSelectedVersion/health-records.svg", text: "PDF Tests", href: "/vet/pdf-test" },
    { path: "/img/sidebar-options/nonSelectedVersion/settings.svg", text: "Settings", href: "/vet/settings" },
  ];

  const handleClick = (href: string) => {
    if (window.location.pathname === href) {
      window.location.reload();
    } else {
      router.push(href);
    }
  };

  return (
    <aside
      style={{
        width: "230px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: "24px 0px",
        borderRight: "1px solid #e5e5e5",
        backgroundColor: "#F9FAFB",
      }}
    >
      <div>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "32px", paddingLeft: "40px", paddingTop: "20px" }}>
          <Image src="/img/vetrail-logo.svg" alt="Vetrail Logo" width={30} height={30} />
          <h1
            style={{
              fontFamily: "Sulphur Point",
              fontSize: "25px",
              fontWeight: "bold",
              marginLeft: "10px",
              marginTop: "8px",
            }}
          >
            Vetrail
          </h1>
        </div>

        {/* Menu Items */}
        <div>
          {menuItems.map((item) => (
            <SideBarItem
              key={item.text}
              path={item.path}
              text={item.text}
              isSelected={selectedPage === item.text}
              onClick={() => handleClick(item.href)}
              notificationCount={item.notificationCount || 0}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};
