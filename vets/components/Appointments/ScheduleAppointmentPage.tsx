"use client";
import React, { useState } from "react";
import WeekCalendar from "../Util/Calendar/WeekCalendar";

export default function ScheduleAppointmentPage({ onSubmit, onCancel }: {
  onSubmit: (appointment: any) => void;
  onCancel: () => void;
}) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reason, setReason] = useState("");
  const [notes, setNotes] = useState("");

  const availableTimes = [
    "9:00 am", "9:30 am", "10:00 am", "10:30 am", "11:00 am", "11:30 am",
    "12:00 pm", "12:30 pm", "1:00 pm", "1:30 pm", "2:00 pm", "2:30 pm", "3:00 pm", "3:30 pm",
  ];

  const handleNext = () => {
    if (!selectedDate || !selectedTime || !reason) {
      alert("Please fill out all required fields.");
      return;
    }

    const newAppointment = {
      date: selectedDate,
      time: selectedTime,
      name: reason,
      notes,
      status: "pending",
    };

    onSubmit(newAppointment);
  };

  return (
    <div style={{ padding: "0 24px", display: "flex", flexDirection: "column", gap: 20 }}>
      <div
        style={{
          color: "#1f2937",
          fontFamily: "Inter",
          fontSize: 20,
          fontStyle: "normal",
          fontWeight: 500,
          lineHeight: "28px",
        }}
      >
        Schedule appointment
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 280, flex: 1 }}>
          <label
            style={{
              color: "#919191",
              fontFamily: "Inter",
              fontSize: 15,
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "220%",
            }}
          >
            Reason for appointment
          </label>

          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            style={{ ...inputStyle }}
          >
            <option value="">Select</option>
            <option value="Annual Check-Up">Annual Check-Up</option>
            <option value="Vaccination">Vaccination</option>
            <option value="Injury">Injury</option>
            <option value="Other">Other</option>
          </select>

          <label
            style={{
              color: "#919191",
              fontFamily: "Inter",
              fontSize: 15,
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "220%",
            }}
          >
            Additional notes
          </label>

          <textarea
            placeholder=""
            style={{ ...inputStyle, height: 100 }}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <div style={{ minWidth: 300, flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <WeekCalendar />
            <div style={{ marginTop: 20, marginLeft: 120 }}>
              <button
                style={{
                  display: "flex",
                  width: 93,
                  height: 33,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  flexShrink: 0,
                  borderRadius: 5,
                  background: "#004D81",
                  color: "white"
                }}
                onClick={handleNext}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "480px",
  padding: "10px",
  border: "1px solid #d1d5db",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#919191",
  boxSizing: "border-box" as const,
};
