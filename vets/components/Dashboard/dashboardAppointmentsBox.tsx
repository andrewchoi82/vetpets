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
        width: "580px",
        height: "300px",
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
        <div style={{ fontSize: "20px", fontWeight: "500", color: "#4c4c4c" }}>
          Upcoming Appointment
        </div>
      </div>

      {/* Main Info Box */}
      <div
        style={{
          backgroundColor: "#f4f4f4",             // lighter gray
          padding: "16px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginLeft: "-16px",
          marginRight: "-16px",
          color: "#4c4c4c"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "17px", fontWeight: "normal" }}>{appointmentData?.date}</div>
            <div
              style={{
                fontSize: "17px",
              }}
            >
              {appointmentData?.time}
            </div>
          </div>
          <div
            style={{
              width: "1px",
              backgroundColor: "#919191",
              alignSelf: "stretch",
              marginTop: "-6px",
              marginBottom: "-6px",
            }}
          />

          <div style={{ fontSize: "17px", fontWeight: "normal" }}>
            {appointmentData?.name}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {appointmentData?.doctorImage && (
            <Image
              src={appointmentData.doctorImage}
              alt="Doctor"
              width={42.4}
              height={41.5}
              style={{ borderRadius: "9999px" }}
            />
          )}
          <div style={{ fontSize: "15px", color: "#6b7280" }}>{appointmentData?.doctorName}</div>
        </div>
      </div>


      {/* Location */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontSize: "17px",
          color: "#919191",
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
          fontSize: "17px",
          color: "#919191",
          padding: "5px",
          paddingBottom: "0px"
        }}
      >
        <Image src="/img/dashboard/compGreenStatus.svg" alt="status" width={18} height={18} />
        <span style={{ color: "#919191", fontStyle: "italic" }}>{appointmentData?.status}</span>
      </div>

      {/* Actions */}
      <div
        style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "16px",
            fontSize: "17px",
            marginBottom: "15px",
        }}
        >
        <button
            style={{
            fontSize: "15px",
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
            fontSize: "15px",
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
