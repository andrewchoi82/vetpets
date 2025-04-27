"use client";
import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

interface BillingsTableProps {
  selectedTab: "current bills" | "payment history";
  setSelectedTabAction: (tab: "current bills" | "payment history") => void;
}

export default function RecordsTable({ selectedTab, setSelectedTabAction }: BillingsTableProps) {
  const [billings, setBillings] = useState<any[]>([]);
  const petId = "1";

  useEffect(() => {
    const fetchBillings = async () => {
      try {
        const res = await fetch(`/api/billings?petId=${petId}`);
        const data = await res.json();
        setBillings(data);
      } catch (error) {
        console.error("Failed to fetch billings:", error);
      }
    };

    fetchBillings();
  }, []);

  const filteredBillings = billings.filter(
    (bill) =>
      (selectedTab === "current bills" && bill.status.toLowerCase() === "unpaid") ||
      (selectedTab === "payment history" && bill.status.toLowerCase() === "paid")
  );

  const renderTable = (data: any[], statusColor: "red" | "green") => (
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
          {data.map((bill, index) => {
            const iconSrc =
              bill.status.toLowerCase() === "unpaid"
                ? "/img/general/red-circle-icon.svg"
                : "/img/general/green-circle-icon.svg";

            return (
              <tr key={index} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                <td style={{ paddingLeft: 40, fontSize: "17px", color: "#111827" }}>
                  {new Date(bill.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td style={{ paddingLeft: 24, fontSize: "17px", color: "#111827" }}>{bill.name}</td>
                <td style={{ paddingLeft: 24, fontSize: "17px", color: "#111827" }}>
                  {`$${bill.cost.toFixed(2)}`}
                </td>
                <td style={{ paddingLeft: 24 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "17px", color: "#111827" }}>
                    <img src={iconSrc} alt={`${bill.status} Icon`} style={{ width: "16px", height: "16px", marginTop: "1px" }} />
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
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
                    onClick={() => window.open(bill.statement, "_blank")}
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

  return <>{selectedTab === "current bills" ? renderTable(filteredBillings, "red") : renderTable(filteredBillings, "green")}</>;
}

const baseThStyle = {
  paddingTop: "20px",
  paddingBottom: "8px",
  fontSize: "13px",
  fontWeight: 500,
  color: "#6B7280",
  textAlign: "left" as const,
};
