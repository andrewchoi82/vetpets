"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Appointment {
  apptId: number;
  name: string;
  date: string;
  time: string;
  location: string;
  status: string;
  doctorName: string;
  doctorImage: string;
}

export default function DashboardAppointmentsBox() {
  const sampData: Appointment = {
    apptId: 1,
    name: "Annual Check-up",
    date: "March 31, 2025",
    time: "3:00 pm",
    location: "1544 W Slauson Ave, Los Angeles, CA 90047",
    status: "Appointment confirmed",
    doctorName: "Dr. Sarah",
    doctorImage: "/img/dashboard/dr-sarah-pfp.jpg",
  };

  const [appointmentData, setAppointmentData] = useState<Appointment>();

  useEffect(() => {
    setAppointmentData(sampData);
  }, []);

  return (
    <div
      style={{
        width: "550px",
        backgroundColor: "white",
        borderRadius: "10px",
        border: "1px solid #e5e5e5",
        padding: "16px",
        paddingBottom: "0px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: "1.125rem", fontWeight: 600, color: "#1f2937" }}>
          Upcoming Appointment
        </div>
        <div style={{ fontSize: "1.25rem", color: "#9ca3af" }}>{">"}</div>
      </div>

      {/* Main Info Box */}
      <div
        style={{
          backgroundColor: "#f3f4f6",
          borderRadius: "6px",
          padding: "12px 16px",
          border: "1px solid #e5e7eb",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "0.875rem", color: "#4b5563" }}>{appointmentData?.date}</div>
            <div
              style={{
                fontSize: "0.875rem",
                color: "#2563eb",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              {appointmentData?.time}
            </div>
          </div>
          <div style={{ width: "1px", height: "40px", backgroundColor: "#d1d5db" }} />
          <div style={{ fontSize: "0.875rem", color: "#1f2937" }}>{appointmentData?.name}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {appointmentData?.doctorImage && (
            <Image
                src={appointmentData.doctorImage}
                alt="Doctor"
                width={32}
                height={32}
                style={{ borderRadius: "9999px" }}
            />
            )}
          <div style={{ fontSize: "0.875rem", color: "#374151" }}>{appointmentData?.doctorName}</div>
        </div>
      </div>

      {/* Location */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "0.875rem",
          color: "#4b5563",
          padding: "5px",
          marginTop: "10px"
        }}
      >
        <Image src="/img/dashboard/compNavigation.svg" alt="location" width={18} height={18} />
        <span>{appointmentData?.location}</span>
      </div>

      {/* Status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "0.875rem",
          color: "#4b5563",
          padding: "5px"
        }}
      >
        <Image src="/img/dashboard/compGreenStatus.svg" alt="status" width={18} height={18} />
        <span style={{ color: "#65a30d", fontStyle: "italic" }}>{appointmentData?.status}</span>
      </div>

      {/* Actions */}
      <div
        style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
            paddingTop: "8px",
        }}
        >
        <button
            style={{
            fontSize: "0.9375rem",
            color: "#1e3a8a",
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
            }}
        >
            Cancel
        </button>

        <button
            style={{
            fontSize: "0.9375rem",
            backgroundColor: "#004d81",
            color: "white",
            padding: "4px 10px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            }}
        >
            Reschedule
        </button>
        </div>
    </div>

  );
}
