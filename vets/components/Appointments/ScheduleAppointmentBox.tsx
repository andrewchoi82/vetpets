"use client";
import React, { useState } from "react";

export default function ScheduleAppointmentBox({
  isOpen,
  onClose,
  onSchedule,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSchedule: (appointment: any) => void;
}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [doctor, setDoctor] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!date || !time || !reason || !doctor) {
      alert("Please fill out all fields.");
      return;
    }

    const newAppointment = {
      date,
      time,
      name: reason,
      doctorId: doctor,
      status: "pending", // Status always pending
    };

    onSchedule(newAppointment);
    onClose();
    // Optionally reset the form:
    setDate("");
    setTime("");
    setReason("");
    setDoctor("");
  };

  return (
    <div style={backdropStyle}>
      <div style={modalStyle}>
        <h2 style={{ marginBottom: "16px" }}>Schedule Appointment</h2>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Time:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Appointment Reason:</label>
          <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} style={inputStyle} />
        </div>
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Veterinarian (doctorId):</label>
          <input type="text" value={doctor} onChange={(e) => setDoctor(e.target.value)} style={inputStyle} />
        </div>

        <div style={{ marginTop: "20px" }}>
          <button onClick={handleSubmit} style={buttonStyle}>Schedule</button>
          <button onClick={onClose} style={{ ...buttonStyle, backgroundColor: "#ccc", color: "#333", marginLeft: "8px" }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

const backdropStyle = {
  position: "fixed" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const modalStyle = {
  backgroundColor: "#fff",
  padding: "24px",
  borderRadius: "8px",
  width: "320px",
  textAlign: "center" as const,
};

const inputGroupStyle = {
  marginBottom: "12px",
  textAlign: "left" as const,
};

const labelStyle = {
  display: "block",
  marginBottom: "4px",
  fontSize: "14px",
  fontWeight: 500,
};

const inputStyle = {
  width: "100%",
  padding: "6px 8px",
  border: "1px solid #ccc",
  borderRadius: "4px",
};

const buttonStyle = {
  padding: "8px 16px",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#1e3a8a",
  color: "#fff",
  cursor: "pointer",
};
