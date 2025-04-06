"use client";
import React from "react";

export default function RecordsTable() {

   const tempData = [
      ["March 16, 2025", "2:30 pm"],
      ["March 14, 2025", "4:30 pm"],
      ["February 12, 2025", "2:00 pm"],
      ["January 05, 2025", "10:00 am"],
      ["January 05, 2024", "12:30 pm"],
      ["December 13, 2023", "12:00 pm"],
      ["May 21, 2023", "11:30 am"],
      ["January 05, 2023", "4:30 pm"],
      ["June 12, 2022", "5:00 pm"],
      ["May 19, 2022", "5:30 pm"],
      ["March 16, 2022", "11:00 am"],
    ];

      
   return (
      <div style={{ width: "100%" }}>
         <table style={{ width: "100%", borderCollapse: "collapse" }}>
         <thead>
            <tr style={{ borderBottom: "1px solid #d1d5db" }}>
               <th style={{ ...baseThStyle, paddingLeft: "32px", width: "150px" }}>Date</th>
               <th style={{ ...baseThStyle, paddingLeft: "64px" }}>Vaccination</th>
            </tr>
         </thead>

         <tbody>
            {tempData.map(([date, time], index) => (
               <tr key={index} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ paddingLeft: "32px", fontSize: "14px", color: "#333" }}>{date}</td>
                  <td style={{ paddingLeft: "64px", fontSize: "14px", color: "#333" }}>{time}</td>
               </tr>
            ))}
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