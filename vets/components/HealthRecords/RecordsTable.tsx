"use client";
import React from "react";


interface HealthRecordsTableProps {
   selectedTab: "vaccinations" | "test results" | "medications" | "medical history";
   setSelectedTabAction: (tab: "vaccinations" | "test results" | "medications" | "medical history") => void;
 }

export default function RecordsTable({selectedTab, setSelectedTabAction} : HealthRecordsTableProps) {
  const vaccinationsData = [
    ["March 16, 2025", "12:00 pm", "Parainfluenza", "Boehringer Ingelheim", "1 mL", "Dr. Sarah Davis"],
    ["March 14, 2025", "12:00 pm", "Parainfluenza", "Boehringer Ingelheim", "1 mL", "Dr. Sarah Davis"],
    ["February 12, 2025", "12:00 pm", "Parainfluenza", "Boehringer Ingelheim", "1 mL", "Dr. Sarah Davis"],
    ["January 05, 2025", "12:00 pm", "Parainfluenza", "Boehringer Ingelheim", "1 mL", "Dr. Sarah Davis"],
    ["January 05, 2024", "12:00 pm", "Parainfluenza", "Boehringer Ingelheim", "1 mL", "Dr. Sarah Davis"],
    ["December 13, 2023", "12:00 pm", "Parainfluenza", "Boehringer Ingelheim", "1 mL", "Dr. Sarah Davis"],
    ["May 21, 2023", "12:00 pm", "Parainfluenza", "Boehringer Ingelheim", "1 mL", "Dr. Sarah Davis"],
    ["January 05, 2023", "12:00 pm", "Parainfluenza", "Boehringer Ingelheim", "1 mL", "Dr. Sarah Davis"],
    ["June 12, 2022", "12:00 pm", "Parainfluenza", "Boehringer Ingelheim", "1 mL", "Dr. Sarah Davis"],
    ["May 19, 2022", "12:00 pm", "Parainfluenza", "Boehringer Ingelheim", "1 mL", "Dr. Sarah Davis"],
    ["March 16, 2022", "12:00 pm", "Parainfluenza", "Boehringer Ingelheim", "1 mL", "Dr. Sarah Davis"],
  ];

  const testResultsData = [
   ["March 16, 2025", "Urinalysis", "Pending"],
   ["March 14, 2025", "Urinalysis", "Pending"],
   ["February 12, 2025", "Urinalysis", "Completed"],
   ["January 05, 2025", "Urinalysis", "Completed"],
   ["January 05, 2024", "Urinalysis", "Completed"],
   ["December 13, 2023", "Urinalysis", "Completed"],
   ["May 21, 2023", "Urinalysis", "Completed"],
   ["January 05, 2023", "Urinalysis", "Completed"],
   ["June 12, 2022", "Urinalysis", "Completed"],
   ["May 19, 2022", "Urinalysis", "Completed"],
   ["March 16, 2022", "Urinalysis", "Completed"],
 ];

 const medicationsData = [
   ["March 16, 2025", "Metronidazole", "1 pill per day", "Active"],
   ["March 14, 2025", "Metronidazole", "1 pill per day", "Active"],
   ["February 12, 2025", "Metronidazole", "1 pill per day", "Completed"],
   ["January 05, 2025", "Metronidazole", "1 pill per day", "Completed"],
   ["January 05, 2024", "Metronidazole", "1 pill per day", "Completed"],
   ["December 13, 2023", "Metronidazole", "1 pill per day", "Completed"],
   ["May 21, 2023", "Metronidazole", "1 pill per day", "Completed"],
   ["January 05, 2023", "Metronidazole", "1 pill per day", "Completed"],
   ["June 12, 2022", "Metronidazole", "1 pill per day", "Completed"],
   ["May 19, 2022", "Metronidazole", "1 pill per day", "Completed"],
   ["March 16, 2022", "Urinalysis", "1 pill per day", "Completed"]
 ];
 
 const medicalHistoryData = [
   ["March 16, 2025", "Hospitalization"],
   ["March 14, 2025", "Paw injury"],
   ["February 12, 2025", "Illness"],
   ["January 05, 2025", "Dental extraction"],
   ["January 05, 2024", "Surgery"],
   ["December 13, 2023", "Surgery"],
   ["May 21, 2023", "Surgery"],
   ["January 05, 2023", "Surgery"],
   ["June 12, 2022", "Surgery"],
   ["May 19, 2022", "Surgery"],
   ["March 16, 2022", "Surgery"],
 ];

  return (
   <>
     {selectedTab === "vaccinations" ? (
       <div style={{ width: "100%" }}>
         <table style={{ width: "100%", borderCollapse: "collapse" }}>
           <thead>
             <tr style={{ borderBottom: "1px solid #d1d5db" }}>
               <th style={{ ...baseThStyle, paddingLeft: 40, width: "170px" }}>Date</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "160px" }}>Vaccine</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "220px" }}>Manufacturer</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "120px" }}>Dosage</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "200px" }}>Administered By</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "120px" }}></th>
             </tr>
           </thead>
           <tbody>
             {vaccinationsData.map(([date, time, vaccine, manufacturer, dosage, administeredBy], index) => (
               <tr key={index} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                 <td style={{ paddingLeft: 40, color: "#111827" }}>{date}</td>
                 <td style={{ paddingLeft: 24, color: "#111827" }}>{vaccine}</td>
                 <td style={{ paddingLeft: 24, color: "#111827" }}>{manufacturer}</td>
                 <td style={{ paddingLeft: 24, color: "#111827" }}>{dosage}</td>
                 <td style={{ paddingLeft: 24, color: "#111827" }}>{administeredBy}</td>
                 <td style={{ paddingLeft: 24 }}>
                   <button
                     style={{
                       display: "flex",
                       alignItems: "center",
                       gap: "6px",
                       border: "none",
                       background: "transparent",
                       color: "#374151",
                       cursor: "pointer",
                       padding: 0,
                     }}
                     onClick={() => alert("Details clicked")}
                   >
                     <img
                       src="/img/health-records/details-icon.svg"
                       alt="Details Icon"
                       style={{ width: "17px", height: "17px" }}
                     />
                     <span style={{ textDecoration: "underline", marginLeft: "17px", fontSize: 17 }}>Details</span>
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     ) : selectedTab === "test results" ? (
      <div style={{ width: "100%" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #d1d5db" }}>
          <th style={{ ...baseThStyle, paddingLeft: 40, width: "160px" }}>Date</th>
          <th style={{ ...baseThStyle, paddingLeft: 24, width: "170px" }}>Test</th>
          <th style={{ ...baseThStyle, paddingLeft: 24, width: "220px" }}>Status</th>
          <th style={{ ...baseThStyle, paddingLeft: 24, width: "120px" }}></th>
        </tr>
      </thead>

      <tbody>
        {testResultsData.map(([date, test, status], index) => {
          const isPending = status === "Pending";
          const iconSrc = isPending
            ? "/img/general/yellow-circle-icon.svg"
            : "/img/general/green-circle-icon.svg";

          return (
            <tr key={index} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ paddingLeft: 40, color: "#111827" }}>{date}</td>
              <td style={{ paddingLeft: 24, color: "#111827" }}>{test}</td>
              <td style={{ paddingLeft: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#111827" }}>
                  <img src={iconSrc} alt={`${status} Icon`} style={{ width: "16px", height: "16px" }} />
                  {status}
                </div>
              </td>
              <td style={{ paddingLeft: 24 }}>
                {!isPending && (
                  <button
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      border: "none",
                      background: "transparent",
                    
                      color: "#374151",
                      cursor: "pointer",
                      padding: 0,
                    }}
                    onClick={() => alert("Download results")}
                  >
                    <img
                      src="/img/health-records/details-icon.svg"
                      alt="Download Icon"
                      style={{ width: "17px", height: "17px" }}
                    />
                    <span style={{ textDecoration: "underline", marginLeft: "17px", fontSize: 17 }}>Results</span>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
     ) : selectedTab === "medications" ? (
      <div style={{ width: "100%" }}>
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid #d1d5db" }}>
          <th style={{ ...baseThStyle, paddingLeft: 40, width: "160px" }}>Date</th>
          <th style={{ ...baseThStyle, paddingLeft: 24, width: "170px" }}>Medication</th>
          <th style={{ ...baseThStyle, paddingLeft: 24, width: "200px" }}>Frequency</th>
          <th style={{ ...baseThStyle, paddingLeft: 24, width: "220px" }}>Status</th>
          <th style={{ ...baseThStyle, paddingLeft: 24, width: "120px" }}></th>
        </tr>
      </thead>

      <tbody>
        {medicationsData.map(([date, medication, frequency, status], index) => {
          const isActive = status === "Active";
          const iconSrc = isActive
            ? "/img/general/yellow-circle-icon.svg"
            : "/img/general/green-circle-icon.svg";

          return (
            <tr key={index} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ paddingLeft: 40, color: "#111827" }}>{date}</td>
              <td style={{ paddingLeft: 24, color: "#111827" }}>{medication}</td>
              <td style={{ paddingLeft: 24, color: "#111827" }}>{frequency}</td>
              <td style={{ paddingLeft: 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#111827" }}>
                  <img src={iconSrc} alt={`${status} Icon`} style={{ width: "16px", height: "16px" }} />
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
                  
                    color: "#374151",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  onClick={() => alert("Download instructions")}
                >
                  <img
                    src="/img/health-records/details-icon.svg"
                    alt="Download Icon"
                    style={{ width: "17px", height: "17px" }}
                  />
                  <span style={{ textDecoration: "underline" }}>Instructions</span>
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
     ) : selectedTab === "medical history" ? (
      <div style={{ width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #d1d5db" }}>
            <th style={{ ...baseThStyle, paddingLeft: 40, width: "160px" }}>Date</th>
            <th style={{ ...baseThStyle, paddingLeft: 24, width: "360px" }}>Category</th>
            <th style={{ ...baseThStyle, paddingLeft: 24, width: "120px" }}></th>
          </tr>
        </thead>
  
        <tbody>
          {medicalHistoryData.map(([date, category], index) => (
            <tr key={index} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
              <td style={{ paddingLeft: 40, color: "#111827" }}>{date}</td>
              <td style={{ paddingLeft: 24, color: "#111827" }}>{category}</td>
              <td style={{ paddingLeft: 24 }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    border: "none",
                    background: "transparent",
                  
                    color: "#374151",
                    cursor: "pointer",
                    padding: 0,
                  }}
                  onClick={() => alert("View details")}
                >
                  <img
                    src="/img/health-records/details-icon.svg"
                    alt="Download Icon"
                    style={{ width: "17px", height: "17px" }}
                  />
                  <span style={{ textDecoration: "underline", marginLeft: "17px", fontSize: 17 }}>Details</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
     ) : null}
   </>
 );

 
}

const baseThStyle = {
  paddingTop: "20px",
  paddingBottom: "8px",
  fontSize: "17px",
  fontWeight: 500,
  color: "#6B7280",
  textAlign: "left" as const,
};
