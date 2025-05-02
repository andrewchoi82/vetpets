"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface BillingsTableProps {
  selectedTab: "current bills" | "payment history";
  setSelectedTabAction: (tab: "current bills" | "payment history") => void;
  billings: any[];
}

export default function BillingsTable({ selectedTab, setSelectedTabAction, billings }: BillingsTableProps) {
  const petId = Cookies.get("petId") || "1";

  const filteredBillings = billings.filter(
    (bill) =>
      (selectedTab === "current bills" && bill.status.toLowerCase() === "unpaid") ||
      (selectedTab === "payment history" && bill.status.toLowerCase() === "paid")
  );

  return (
    <div style={{ width: "100%", minHeight: "600px" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #d1d5db" }}>
            <th style={{ ...baseThStyle, width: "176px", paddingLeft: "40px" }}>Date</th>
            <th style={{ ...baseThStyle, width: "240px" }}>Appointment reason</th>
            <th style={{ ...baseThStyle, width: "160px" }}>Total amount</th>
            <th style={{ ...baseThStyle, width: "160px" }}>Status</th>
            <th style={{ ...baseThStyle, width: "120px" }}></th>
          </tr>
        </thead>
        <tbody>
          {filteredBillings.map((bill, index) => {
            const iconSrc =
              bill.status.toLowerCase() === "unpaid"
                ? "/img/general/red-circle-icon.svg"
                : "/img/general/green-circle-icon.svg";

            return (
              <tr key={index} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                <td style={{ ...baseTdStyle, paddingLeft: "40px" }}>
                  {new Date(bill.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td style={baseTdStyle}>{bill.name}</td>
                <td style={baseTdStyle}>${bill.cost.toFixed(2)}</td>
                <td style={baseTdStyle}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img
                      src={iconSrc}
                      alt={`${bill.status} Icon`}
                      style={{ width: "16px", height: "16px", marginTop: "1px" }}
                    />
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </div>
                </td>
                <td style={baseTdStyle}>
                  <button
                    onClick={() => window.open(bill.statement, "_blank")}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      background: "transparent",
                      border: "none",
                      color: "#4C4C4C",
                      fontSize: "15px",
                      fontWeight: 400,
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    <img
                      src="/img/health-records/details-icon.svg"
                      alt="Statement Icon"
                      style={{ width: "18px", height: "18px", marginTop: "4px" }}
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
}

const baseThStyle = {
  height: "64px",
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
