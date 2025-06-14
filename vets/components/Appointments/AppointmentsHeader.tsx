"use client";

import React from "react";
import Image from "next/image";
import { SelectTab } from "../Util/SelectTab";

interface AppointmentsHeaderProps {
  selectedTab: "upcoming" | "past" | null;
  setSelectedTab: (tab: "upcoming" | "past") => void;
  onScheduleClick: () => void;
}

export default function AppointmentsHeader({
  selectedTab,
  setSelectedTab,
  onScheduleClick,
}: AppointmentsHeaderProps) {
  const getIconPath = (tabValue: "upcoming" | "past") => {
    const isSelected = selectedTab === tabValue;
    const folder = isSelected ? "selected" : "nonSelected";
    const filename = `${tabValue}-appointments.svg`;
    return `/img/appointments/${folder}/${filename}`;
  };

  const tabItems = [
    {
      label: "Upcoming Appointments",
      value: "upcoming",
      icon: (
        <Image
          src={getIconPath("upcoming")}
          alt="Upcoming"
          width={19}
          height={14}
        />
      ),
    },
    {
      label: "Past Appointments",
      value: "past",
      icon: (
        <Image
          src={getIconPath("past")}
          alt="Past"
          width={20}
          height={14}
        />
      ),
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: "0 24px",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        {/* Title and paw icon */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: 22, fontWeight: 500 }}>Appointments</div>
          <Image
            src="/img/paw.svg"
            alt="Paw Icon"
            width={20}
            height={20}
            style={{ marginLeft: 9 }}
          />
        </div>

        {/* Select Tabs */}
        <div style={{ marginTop: 8 }}>
          <SelectTab
            tabs={tabItems}
            selectedTab={selectedTab}
            onSelectTab={(tabValue) => setSelectedTab(tabValue as "upcoming" | "past")}
          />
        </div>
      </div>

      {/* Schedule Appointment Button */}
      <button
        onClick={onScheduleClick}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
          padding: "0px 18px",
          height: "33px",
          borderRadius: "100px",
          border: "1px solid #DFDFDF",
          backgroundColor: "#FFFFFF",
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.03)",
          fontWeight: 500,
          fontSize: "15px",
          color: "#4C4C4C",
          cursor: "pointer",
          whiteSpace: "nowrap",
          lineHeight: 1,
          marginBottom: "20px",
          marginRight: "40px",
          transition: "all 0.2s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#f9fafb";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#ffffff";
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.97)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#4C4C4C"
          strokeWidth="2"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Schedule appointment
      </button>
    </div>
  );
}
