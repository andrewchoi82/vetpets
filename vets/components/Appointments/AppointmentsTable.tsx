"use client";

import React from "react";

export default function AppointmentsTable({ appointments }: { appointments: any[] }) {
  return (
    <div style={{ width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #d1d5db" }}>
            <th style={{ ...baseThStyle, width: "176px", paddingLeft: "40px" }}>Date</th>
            <th style={{ ...baseThStyle, width: "140px" }}>Time</th>
            <th style={{ ...baseThStyle, width: "240px" }}>Appointment Reason</th>
            <th style={{ ...baseThStyle, width: "200px" }}>Veterinarian</th>
            <th style={{ ...baseThStyle, width: "120px" }}>Status</th>
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
                  fontSize: "15px",
                  color: "#4C4C4C",
                  lineHeight: "220%",
                }}
              >
                You have no scheduled appointments.
              </td>
            </tr>
          ) : (
            appointments.map((appt) => (
              <tr key={appt.apptId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                <td style={{ ...baseTdStyle, paddingLeft: "40px" }}>
                  {new Date(appt.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td style={baseTdStyle}>
                  {new Date(`1970-01-01T${appt.time}`).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </td>
                <td style={baseTdStyle}>{appt.name}</td>
                <td style={baseTdStyle}>{`Dr. ${appt?.pets?.users?.lastName}`}</td>
                <td style={baseTdStyle}>{appt.status}</td>
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
  fontSize: "17px",
  fontWeight: 400,
  fontFamily: "SF Pro",
  color: "#919191",
  lineHeight: "220%",
  fontStyle: "normal",
  textAlign: "left" as const,
  verticalAlign: "middle" as const,
};

const baseTdStyle = {
  height: "64px",
  fontSize: "15px",
  fontWeight: 400,
  fontFamily: "Inter",
  color: "#4C4C4C",
  lineHeight: "220%",
  fontStyle: "normal",
  textAlign: "left" as const,
  verticalAlign: "middle" as const,
};
