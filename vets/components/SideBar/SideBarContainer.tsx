"use client";

import { SideBarItem } from "@/components/SideBar/SideBarItem";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface SideBarContainerProps {
  selectedPage: string;
}

export const SideBarContainer = ({ selectedPage }: SideBarContainerProps) => {
  const router = useRouter();

  const menuItems = [
    { path: "/img/sidebar-options/dashboard.svg", text: "Dashboard", href: "/" },
    { path: "/img/sidebar-options/message.svg", text: "Messages", href: "/message", notificationCount: 2 },
    { path: "/img/sidebar-options/appointments.svg", text: "Appointments", href: "/appointments" },
    { path: "/img/sidebar-options/test-results.svg", text: "Health records", href: "/test-results" },
    { path: "/img/sidebar-options/billing.svg", text: "Billings", href: "/billing" },
    { path: "/img/sidebar-options/immunization.svg", text: "Settings", href: "/settings" },
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
              fontSize: "22px",
              fontWeight: "bold",
              marginLeft: "10px",
              marginTop: "2px",
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
