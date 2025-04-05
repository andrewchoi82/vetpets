"use client";
import React from "react";

export default function AppointmentsTable() {
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