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
    <div style={{ padding: "0 24px", maxWidth: "600px", margin: "0" }}>
      <div style={{ 
        fontSize: "16px", 
        fontWeight: "500", 
        color: "#4C4C4C", 
        marginBottom: "24px" 
      }}>
        Appointment confirmation
      </div>

      <div style={{ 
        backgroundColor: "white", 
        borderRadius: "8px", 
        padding: "24px",
        border: "1px solid #d1d5db"
      }}>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ color: "#919191", marginBottom: "6px", fontSize: "13px" }}>
            Appointment reason
          </div>
          <div style={{ color: "#4C4C4C", fontSize: "14px" }}>
            {appointmentReason}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ color: "#919191", marginBottom: "6px", fontSize: "13px" }}>
            Clinic
          </div>
          <div style={{ color: "#4C4C4C", fontSize: "14px" }}>
            {clinic}
          </div>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "6px",
            color: "#4C4C4C",
            marginTop: "4px",
            fontSize: "14px"
          }}>
            <img 
              src="/img/appointments/cursor.svg" 
              alt="Location" 
              style={{ width: "14px", height: "14px" }}
            />
            {clinicAddress}
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <div style={{ color: "#919191", marginBottom: "6px", fontSize: "13px" }}>
            Date & time
          </div>
          <div style={{ color: "#4C4C4C", fontSize: "14px" }}>
            {dateTime}
          </div>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <div style={{ color: "#919191", marginBottom: "6px", fontSize: "13px" }}>
            Booked for
          </div>
          <div style={{ color: "#4C4C4C", fontSize: "14px" }}>
            {petName}
          </div>
        </div>

        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end",
          gap: "12px" 
        }}>
          <button
            onClick={onBack}
            style={{
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid #004F82",
              color: "#004F82",
              backgroundColor: "white",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "500"
            }}
          >
            Back
          </button>
          <button
            onClick={onConfirm}
            style={{
              display: "flex",
              width: "100px",
              height: "32px",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              flexShrink: 0,
              borderRadius: "5px",
              background: "#004D81",
              color: "white",
              border: "none",
              fontSize: "13px",
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