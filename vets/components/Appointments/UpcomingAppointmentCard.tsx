"use client";
import React from "react";
import Image from "next/image";

interface UpcomingAppointmentCardProps {
  appt: any;
  style?: React.CSSProperties;
}

export default function UpcomingAppointmentCard({ appt, style }: UpcomingAppointmentCardProps) {
  const formattedDate = new Date(appt.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(`1970-01-01T${appt.time}`).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 633,
        borderRadius: 10,
        border: "1px solid #E5E7EB",
        backgroundColor: "#ffffff",
        overflow: "hidden",
        fontSize: 14,
        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
        ...style,
      }}
    >
      {/* Green Banner */}
      <div
        style={{
          backgroundColor: "#e0fcd4",
          padding: "16px 20px 20px 20px",
          display: "flex",
          alignItems: "center",
          gap: 10,
        }}
      >
        <Image src="/img/dashboard/compGreenStatus.svg" alt="Confirmed" width={18} height={18} />
        <span
          style={{
            color: "#919191",
            fontFamily: "Inter",
            fontSize: 17,
            fontStyle: "italic",
            fontWeight: 400,
            lineHeight: "220%",
          }}
        >
          Appointment confirmed
        </span>
      </div>

      <div style={{ padding: "14px 20px" }}>
        {/* Appointment Reason */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: "#919191", fontSize: 15, fontFamily: "Inter", marginBottom: 5 }}>
            Appointment Reason
          </div>
          <div style={{ fontSize: 17, color: "#4C4C4C", fontWeight: 500 }}>{appt.name}</div>
        </div>

        {/* Clinic */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: "#919191", fontSize: 15, fontFamily: "Inter", marginBottom: 5 }}>
            Clinic
          </div>
          <div
            style={{
              color: "#4C4C4C",
              fontFamily: "Inter",
              fontSize: 17,
              fontWeight: 500,
              lineHeight: "220%",
              marginBottom: 5,
            }}
          >
            Los Angeles Vet Clinic
          </div>
          <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
            <Image src="/img/appointments/cursor.svg" alt="Location" width={14} height={14} />
            <span
              style={{
                marginLeft: 6,
                color: "#919191",
                fontFamily: "SF Pro",
                fontSize: 17,
                fontWeight: 400,
                lineHeight: "220%",
              }}
            >
              1544 W Slauson Ave, Los Angeles, CA 90047
            </span>
          </div>
        </div>

        {/* Date & Time */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ color: "#919191", fontSize: 15, fontFamily: "Inter", marginBottom: 5 }}>
            Date & Time
          </div>
          <div style={{ fontSize: 17, color: "#4C4C4C" }}>
            {formattedTime}, {formattedDate}
          </div>
        </div>

        {/* Booked For, Veterinarian, and Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ color: "#919191", fontSize: 15, fontFamily: "Inter", marginBottom: 5 }}>
              Booked For
            </div>
            <div style={{ fontSize: 17, color: "#4C4C4C" }}>Snowball</div>
          </div>

          <div style={{ flex: 1, minWidth: 140 }}>
            <div style={{ color: "#919191", fontSize: 15, fontFamily: "Inter", marginBottom: 5 }}>
              Veterinarian
            </div>
            <div style={{ fontSize: 17, color: "#4C4C4C" }}>
              {`Dr. ${appt?.pets?.users?.lastName}`}
            </div>
          </div>

          {/* Cancel & Reschedule Buttons */}
          <div style={{ display: "flex", gap: 12, marginLeft: "auto", marginTop: 10 }}>
            {/* Cancel */}
            <button
              style={{
                border: "none",
                background: "none",
                color: "#004D81",
                textDecoration: "underline",
                fontSize: 14,
                fontFamily: "Inter",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>

            {/* Reschedule */}
            <button
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
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
