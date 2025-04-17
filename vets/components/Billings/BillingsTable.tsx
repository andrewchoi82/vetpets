"use client";
import React from "react";

interface BillingsTableProps {
  selectedTab: "current bills" | "payment history";
  setSelectedTabAction: (tab: "current bills" | "payment history") => void;
}

export default function RecordsTable({ selectedTab, setSelectedTabAction }: BillingsTableProps) {
  const currentBillsData = [
    ["March 16, 2025", "Annual check-up", "$185.00", "Unpaid"],
    ["March 14, 2025", "Annual check-up", "$185.00", "Unpaid"],
    ["February 12, 2025", "Annual check-up", "$185.00", "Unpaid"],
    ["January 05, 2025", "Annual check-up", "$185.00", "Unpaid"],
    ["January 05, 2024", "Annual check-up", "$185.00", "Unpaid"],
    ["December 13, 2023", "Annual check-up", "$185.00", "Unpaid"],
    ["May 21, 2023", "Annual check-up", "$185.00", "Unpaid"],
    ["January 05, 2023", "Annual check-up", "$185.00", "Unpaid"],
    ["June 12, 2022", "Annual check-up", "$185.00", "Unpaid"],
    ["May 19, 2022", "Annual check-up", "$185.00", "Unpaid"],
    ["March 16, 2022", "Annual check-up", "$185.00", "Unpaid"],
  ];

  const paidBillsData = currentBillsData.map(([date, reason, amount]) => [date, reason, amount, "Paid"]);

  const renderTable = (data: string[][], statusColor: "red" | "green") => (
    <div style={{ width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #d1d5db" }}>
            <th style={{ ...baseThStyle, fontSize: 17, paddingLeft: 40, width: "160px" }}>Date</th>
            <th style={{ ...baseThStyle, fontSize: 17, paddingLeft: 24, width: "240px" }}>Appointment reason</th>
            <th style={{ ...baseThStyle, fontSize: 17, paddingLeft: 24, width: "160px" }}>Total amount</th>
            <th style={{ ...baseThStyle, fontSize: 17, paddingLeft: 24, width: "160px" }}>Status</th>
            <th style={{ ...baseThStyle, fontSize: 17, paddingLeft: 24, width: "120px" }}></th>
          </tr>
        </thead>
        <tbody>
          {data.map(([date, reason, amount, status], index) => {
            const iconSrc = status === "Unpaid"
              ? "/img/general/red-circle-icon.svg"
              : "/img/general/green-circle-icon.svg";

            return (
              <tr key={index} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                <td style={{ paddingLeft: 40, fontSize: "17px", color: "#111827" }}>{date}</td>
                <td style={{ paddingLeft: 24, fontSize: "17px", color: "#111827" }}>{reason}</td>
                <td style={{ paddingLeft: 24, fontSize: "17px", color: "#111827" }}>{amount}</td>
                <td style={{ paddingLeft: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "17px", color: "#111827" }}>
                    <img src={iconSrc} alt={`${status} Icon`} style={{ width: "16px", height: "16px", marginTop: "1px" }} />
                    {status}
                  </div>
                </td>
                <td style={{ paddingLeft: 24 }}>
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "none",
                      background: "transparent",
                      fontSize: "17px",
                      color: "#374151",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onClick={() => alert("Download statement")}
                  >
                    <img
                      src="/img/health-records/details-icon.svg"
                      alt="Download Icon"
                      style={{ width: "18px", height: "18px", marginTop: "5px" }}
                    />
                    <span style={{ textDecoration: "underline" }}>Statement</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return <>{selectedTab === "current bills" ? renderTable(currentBillsData, "red") : renderTable(paidBillsData, "green")}</>;
}

const baseThStyle = {
  paddingTop: "20px",
  paddingBottom: "8px",
  fontSize: "13px",
  fontWeight: 500,
  color: "#6B7280",
  textAlign: "left" as const,
};