"use client";
import React from "react";
import Image from "next/image";

export default function TempPastAppointment({
  appt,
  onClose,
}: {
  appt: any;
  onClose: () => void;
}) {
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
        display: "flex",
        gap: "24px",
        padding: "0 24px",
        alignItems: "flex-start",
        marginTop: "30px",
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          width: "100%",
          maxWidth: 633,
          borderRadius: 10,
          border: "1px solid #E5E7EB",
          backgroundColor: "#ffffff",
          overflow: "hidden",
          fontSize: 14,
          fontFamily: "Inter",
          boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
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
          <Image src="/img/dashboard/compGreenStatus.svg" alt="Completed" width={18} height={18} />
          <span
            style={{
              color: "#919191",
              fontSize: 17,
              fontStyle: "italic",
              fontWeight: 400,
              lineHeight: "220%",
            }}
          >
            Appointment completed
          </span>
        </div>

        <div style={{ padding: "14px 20px" }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ color: "#919191", fontSize: 15, marginBottom: 5 }}>Appointment Reason</div>
            <div style={{ fontSize: 17, color: "#4C4C4C", fontWeight: 500 }}>{appt.name}</div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ color: "#919191", fontSize: 15, marginBottom: 5 }}>Clinic</div>
            <div
              style={{
                color: "#4C4C4C",
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
                  fontSize: 17,
                  fontWeight: 400,
                  lineHeight: "220%",
                }}
              >
                1544 W Slauson Ave, Los Angeles, CA 90047
              </span>
            </div>
          </div>

          <div style={{ marginBottom: 24 }}>
            <div style={{ color: "#919191", fontSize: 15, marginBottom: 5 }}>Date & Time</div>
            <div style={{ fontSize: 17, color: "#4C4C4C" }}>
              {formattedTime}, {formattedDate}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ color: "#919191", fontSize: 15, marginBottom: 5 }}>Booked For</div>
              <div style={{ fontSize: 17, color: "#4C4C4C" }}>Joey</div>
            </div>

            <div style={{ flex: 1, minWidth: 140 }}>
              <div style={{ color: "#919191", fontSize: 15, marginBottom: 5 }}>Veterinarian</div>
              <div style={{ fontSize: 17, color: "#4C4C4C" }}>
                Dr. {appt?.pets?.users?.lastName}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%", maxWidth: 633 }}>
        {/* Booking Details */}
        <div
          style={{
            borderRadius: 10,
            border: "1px solid #E5E7EB",
            backgroundColor: "#ffffff",
            padding: "24px",
            fontFamily: "Inter",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 500, color: "#4C4C4C", marginBottom: 24 }}>
            Booking details
          </div>

          {[
            { item: "Bordetella vaccine", price: "$50" },
            { item: "Leptospirosis vaccine", price: "$50" },
            { item: "Annual Check-up", price: "$150" },
          ].map((entry, idx) => (
            <div
              key={idx}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 24,
                fontSize: 15,
                color: "#4C4C4C",
              }}
            >
              <span>{entry.item}</span>
              <span>{entry.price}</span>
            </div>
          ))}

          <div style={{ paddingTop: 20, borderTop: "1px solid #E5E7EB" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 16,
                fontWeight: 600,
                color: "#4C4C4C",
              }}
            >
              <span>Total</span>
              <span>$250</span>
            </div>
          </div>
        </div>

        {/* Doctor's Notes */}
        <div
          style={{
            borderRadius: 10,
            border: "1px solid #E5E7EB",
            backgroundColor: "#ffffff",
            padding: "24px",
            fontFamily: "Inter",
            boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
            flex: 1,
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 500, color: "#4C4C4C", marginBottom: 16 }}>
            Appointment Summary
          </div>
          <div style={{ fontSize: 15, color: "#4C4C4C", lineHeight: "1.6" }}>
            {appt?.doctorNotes ?? "On this day, you brought in your dog, Max, for a routine wellness checkup. The veterinarian conducted a full physical examination and confirmed that Max is in good overall health. His weight is stable, his heart and lungs sounded normal, and his coat appeared healthy. He received his annual rabies and distemper vaccinations, along with a preventative treatment for fleas and ticks. You mentioned some occasional scratching, so the vet recommended a mild allergy supplement and advised monitoring his condition. Max was well-behaved throughout the visit and is scheduled to return in six months for his next check-up."}
          </div>
        </div>
      </div>
    </div>
  );
}
