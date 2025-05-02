"use client";

import React from "react";
import Image from "next/image";

export default function AppointmentsTable({
  appointments,
  onRowClick,
}: {
  appointments: any[];
  onRowClick?: (appt: any) => void;
}) {
  return (
    <div style={{ width: "100%", padding: "0 24px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #e5e7eb" }}>
            <th style={{ ...baseThStyle, paddingLeft: "16px", width: "160px" }}>Date</th>
            <th style={{ ...baseThStyle, width: "120px" }}>Time</th>
            <th style={{ ...baseThStyle, width: "260px" }}>Appointment reason</th>
            <th style={{ ...baseThStyle, width: "200px" }}>Veterinarian</th>
            <th style={{ ...baseThStyle, width: "120px" }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length === 0 ? (
            <tr style={{ height: "64px" }}>
              <td colSpan={5} style={emptyRowStyle}>
                You have no past appointments.
              </td>
            </tr>
          ) : (
            appointments.map((appt) => {
              const isMissed = appt.status?.toLowerCase() === "missed";
              const capitalizedStatus =
                appt.status?.charAt(0).toUpperCase() + appt.status?.slice(1).toLowerCase();

              return (
                <tr
                  key={appt.apptId}
                  onClick={() => onRowClick?.(appt)}
                  style={{
                    height: "64px",
                    borderBottom: "1px solid #e5e7eb",
                    cursor: "default",
                  }}
                >
                  <td style={{ ...baseTdStyle, paddingLeft: "16px" }}>
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
                  <td style={baseTdStyle}>
                    {`Dr. ${appt?.pets?.users?.firstName} ${appt?.pets?.users?.lastName}`}
                  </td>
                  <td style={baseTdStyle}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Image
                        src={
                          isMissed
                            ? "/img/dashboard/compRedStatus.svg"
                            : "/img/dashboard/compGreenStatus.svg"
                        }
                        alt={capitalizedStatus}
                        width={12}
                        height={12}
                      />
                      <span
                        style={{
                          color: "#4C4C4C",
                          fontWeight: 400,
                          fontFamily: "Inter",
                          fontSize: "15px",
                          fontStyle: "normal",
                          lineHeight: "33px",
                        }}
                      >
                        {capitalizedStatus}
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

const baseThStyle = {
  paddingTop: "20px",
  paddingBottom: "8px",
  fontSize: "16px",
  fontWeight: 500,
  color: "#6B7280",
  textAlign: "left" as const,
  fontFamily: "Inter",
  lineHeight: "33px",
};

const baseTdStyle = {
  fontSize: "15px",
  fontWeight: 400,
  color: "#4C4C4C",
  fontFamily: "Inter",
  fontStyle: "normal",
  lineHeight: "33px",
  textAlign: "left" as const,
  verticalAlign: "middle" as const,
};

const emptyRowStyle = {
  textAlign: "center" as const,
  paddingTop: "28px",
  fontStyle: "italic",
  fontWeight: 500,
  fontSize: "15px",
  color: "#4C4C4C",
  fontFamily: "Inter",
  lineHeight: "33px",
};
