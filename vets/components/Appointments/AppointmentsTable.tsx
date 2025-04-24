"use client";
import React from "react";

export default function AppointmentsTable({ appointments }: { appointments: any[] }) {
  return (
    <div style={{ width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #d1d5db" }}>
            <th style={{ ...baseThStyle, paddingLeft: "32px" }}>Date</th>
            <th style={baseThStyle}>Time</th>
            <th style={baseThStyle}>Appointment Reason</th>
            <th style={baseThStyle}>Veterinarian</th>
            <th style={{ ...baseThStyle, paddingRight: "32px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr style={{ height: "64px" }}>
              <td
                colSpan={5}
                style={{
                  textAlign: "center",
                  paddingTop: "28px",
                  fontStyle: "italic",
                  fontWeight: 500,
                  color: "black",
                }}
              >
                You have no scheduled appointments.
              </td>
            </tr>
          ) : (
            appointments.map((appt) => (
              <tr key={appt.apptId} style={{ height: "64px", borderBottom: "1px solid #d1d5db", color: "#4c4c4c" }}>
                <td style={{ paddingLeft: "32px" }}>
                  {new Date(appt.date).toLocaleDateString("en-US", {
                     year: "numeric",
                     month: "long",
                     day: "numeric",
                  })}
                </td>

                <td>{appt.time}</td>
                <td>{appt.name}</td>
                <td>{`Dr. ${appt.doctorId}`}</td> {/* Replace with actual doctor name if available */}
                <td style={{ paddingRight: "32px" }}>{appt.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const baseThStyle = {
  paddingTop: "20px",
  paddingBottom: "8px",
  fontSize: "14px",
  fontWeight: 500,
  color: "#919191",
  textAlign: "left" as const,
};
