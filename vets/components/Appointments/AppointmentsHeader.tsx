"use client";
import React from "react";
import Image from "next/image";

interface AppointmentsHeaderProps {
  selectedTab: "upcoming" | "past";
  setSelectedTab: (tab: "upcoming" | "past") => void;
  onScheduleClick: () => void; // ✅ Add this prop
}

export default function AppointmentsHeader({
  selectedTab,
  setSelectedTab,
  onScheduleClick,
}: AppointmentsHeaderProps) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 24px", borderBottom: "1px solid #e5e7eb" }}>
      {/* Tabs */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ display: "flex", gap: "32px", marginTop: "25px" }}>
          <button
            onClick={() => setSelectedTab("upcoming")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginTop: "5px",
              paddingBottom: "14px",
              border: "none",
              background: "none",
              borderBottom: selectedTab === "upcoming" ? "2px solid #1e3a8a" : "2px solid transparent",
              color: selectedTab === "upcoming" ? "#1e3a8a" : "#4b5563",
              fontWeight: selectedTab === "upcoming" ? 500 : 300,
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            <Image src="/img/appointments/upcoming-appointments.svg" alt="Upcoming" width={19} height={14} />
            Upcoming Appointments
          </button>

          <button
            onClick={() => setSelectedTab("past")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginTop: "5px",
              paddingBottom: "14px",
              border: "none",
              background: "none",
              borderBottom: selectedTab === "past" ? "2px solid #1e3a8a" : "2px solid transparent",
              color: selectedTab === "past" ? "#1e3a8a" : "#4b5563",
              fontWeight: selectedTab === "past" ? 500 : 300,
              fontSize: "17px",
              cursor: "pointer",
            }}
          >
            <Image src="/img/appointments/past-appointments.svg" alt="Past" width={20} height={14} />
            Past Appointments
          </button>
        </div>
      </div>

      <button
        onClick={onScheduleClick}
        style={{
          backgroundColor: "#1e3a8a",
          color: "white",
          padding: "8px 16px",
          borderRadius: "6px",
          fontWeight: 500,
          fontSize: "14px",
          cursor: "pointer",
          marginBottom: "11px",
        }}
      >
        Schedule Appointment
      </button>
    </div>
  );
}
