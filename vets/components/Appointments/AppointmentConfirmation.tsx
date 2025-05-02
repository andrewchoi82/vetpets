"use client";
import React from 'react';

interface AppointmentConfirmationProps {
  appointmentReason: string;
  clinic: string;
  clinicAddress: string;
  dateTime: string;
  petName: string;
  onConfirm: () => void;
  onBack: () => void;
}

export default function AppointmentConfirmation({
  appointmentReason,
  clinic,
  clinicAddress,
  dateTime,
  petName,
  onConfirm,
  onBack
}: AppointmentConfirmationProps) {
  return (
    <div style={{ padding: "0 24px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ 
        fontSize: "24px", 
        fontWeight: "500", 
        color: "#4C4C4C", 
        marginBottom: "32px" 
      }}>
        Appointment confirmation
      </div>

      <div style={{ 
        backgroundColor: "white", 
        borderRadius: "10px", 
        padding: "32px",
        border: "1px solid #d1d5db"
      }}>
        <div style={{ marginBottom: "24px" }}>
          <div style={{ color: "#919191", marginBottom: "8px" }}>
            Appointment reason
          </div>
          <div style={{ color: "#4C4C4C", fontSize: "16px" }}>
            {appointmentReason}
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <div style={{ color: "#919191", marginBottom: "8px" }}>
            Clinic
          </div>
          <div style={{ color: "#4C4C4C", fontSize: "16px" }}>
            {clinic}
          </div>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px",
            color: "#4C4C4C",
            marginTop: "4px"
          }}>
            <img 
              src="/img/appointments/cursor.svg" 
              alt="Location" 
              style={{ width: "16px", height: "16px" }}
            />
            {clinicAddress}
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <div style={{ color: "#919191", marginBottom: "8px" }}>
            Date & time
          </div>
          <div style={{ color: "#4C4C4C", fontSize: "16px" }}>
            {dateTime}
          </div>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <div style={{ color: "#919191", marginBottom: "8px" }}>
            Booked for
          </div>
          <div style={{ color: "#4C4C4C", fontSize: "16px" }}>
            {petName}
          </div>
        </div>

        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end",
          gap: "16px" 
        }}>
          <button
            onClick={onBack}
            style={{
              padding: "8px 16px",
              borderRadius: "8px",
              border: "1px solid #004F82",
              color: "#004F82",
              backgroundColor: "white",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            style={{
              display: "flex",
              width: "109px",
              height: "34px",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              flexShrink: 0,
              borderRadius: "5px",
              background: "#004D81",
              color: "white",
              border: "none",
              fontSize: "14px",
              fontWeight: "500"
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
} 