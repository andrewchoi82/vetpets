"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { getFileUrl } from "@/app/lib/supabaseGetFile";

interface RecordsHeaderProps {
  selectedTab: "vaccinations" | "test results" | "medications" | "medical history";
  setSelectedTabAction: (tab: "vaccinations" | "test results" | "medications" | "medical history") => void;
  tabChange: boolean;
  setTabChange: (change: boolean) => void;
}

interface Vaccination {
  vaccineId: number;
  name: string;
  manufacturer: string;
  dosage: number;
  administeredBy: string;
  details: string;
  petId: number;
}

interface Medication {
  medicationId: number;
  petId: number;
  date: string;
  medication: string;
  frequency: string;
  status: string;
  details: string;
}

interface MedicalHistory {
  historyId: number;
  date: string;
  petId: number;
  category: string;
  details: string;
}

interface TestResult {
  testId: number;
  petId: number;
  name: string;
  dateOrdered: string;
  dateExpected: string;
  status: string;
  result: string;
}

interface RecordsTableProps {
  selectedTab: "vaccinations" | "test results" | "medications" | "medical history";
  setSelectedTabAction: (tab: "vaccinations" | "test results" | "medications" | "medical history") => void;
  tabChange: boolean;
  setTabChange: (value: boolean) => void;
  records: any[];
}

export default function RecordsTable({ 
  selectedTab, 
  setSelectedTabAction, 
  tabChange, 
  setTabChange,
  records 
}: RecordsTableProps) {
  const petId = Cookies.get("petId") || "1";

  return (
    <div style={{ width: "100%", minHeight: "600px" }}>
      {selectedTab === "vaccinations" && (
        <VaccinationTable data={records as Vaccination[]} />
      )}
      {selectedTab === "test results" && (
        <TestResultsTable data={records as TestResult[]} />
      )}
      {selectedTab === "medications" && (
        <MedicationsTable data={records as Medication[]} />
      )}
      {selectedTab === "medical history" && (
        <MedicalHistoryTable data={records as MedicalHistory[]} />
      )}
    </div>
  );
}

// Vaccinations Table
const VaccinationTable = ({ data }: { data: Vaccination[] }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ borderBottom: "1px solid #d1d5db" }}>
        <th style={{ ...baseThStyle, width: "176px", paddingLeft: "40px" }}>Date</th>
        <th style={{ ...baseThStyle, width: "142px" }}>Vaccine</th>
        <th style={{ ...baseThStyle, width: "136px" }}>Manufacturer</th>
        <th style={{ ...baseThStyle, width: "70px" }}>Dosage</th>
        <th style={{ ...baseThStyle,}}>Administered by</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.vaccineId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
          <td style={{ ...baseTdStyle, paddingLeft: 40 }}>{new Date().toLocaleDateString()}</td>
          <td style={{ ...baseTdStyle }}>{item.name}</td>
          <td style={{ ...baseTdStyle }}>{item.manufacturer}</td>
          <td style={{ ...baseTdStyle }}>{item.dosage} mL</td>
          <td style={{ ...baseTdStyle }}>{item.administeredBy}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Test Results Table
const TestResultsTable = ({ data }: { data: TestResult[] }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ borderBottom: "1px solid #d1d5db" }}>
        <th style={{ ...baseThStyle, width: "176px", paddingLeft: "40px" }}>Date</th>
        <th style={{ ...baseThStyle, width: "142px" }}>Test</th>
        <th style={{ ...baseThStyle, width: "136px" }}>Status</th>
        <th style={{ ...baseThStyle, width: "70px" }}></th> {/* empty for alignment */}
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.testId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
          <td style={{ ...baseTdStyle, paddingLeft: 40 }}>{item.dateOrdered}</td>
          <td style={{ ...baseTdStyle }}>{item.name}</td>
          <td style={{ ...baseTdStyle }}>{item.status}</td>
          <td style={{ ...baseTdStyle }}></td> {/* keep grid layout stable */}
        </tr>
      ))}
    </tbody>
  </table>
);


// Medications Table
const MedicationsTable = ({ data }: { data: Medication[] }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ borderBottom: "1px solid #d1d5db" }}>
        <th style={{ ...baseThStyle, width: "176px", paddingLeft: "40px" }}>Date</th>
        <th style={{ ...baseThStyle, width: "142px" }}>Medication</th>
        <th style={{ ...baseThStyle, width: "136px" }}>Frequency</th>
        <th style={{ ...baseThStyle, width: "70px" }}>Status</th>
        <th style={{ ...baseThStyle }}></th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.medicationId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
          <td style={{ ...baseTdStyle, paddingLeft: 40 }}>{item.date}</td>
          <td style={{ ...baseTdStyle }}>{item.medication}</td>
          <td style={{ ...baseTdStyle }}>{item.frequency}</td>
          <td style={{ ...baseTdStyle }}>{item.status}</td>
          <td style={{ ...baseTdStyle }}></td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Medical History Table
const MedicalHistoryTable = ({ data }: { data: MedicalHistory[] }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ borderBottom: "1px solid #d1d5db" }}>
        <th style={{ ...baseThStyle, width: "176px", paddingLeft: "40px" }}>Date</th>
        <th style={{ ...baseThStyle, width: "142px" }}>Category</th>
        <th style={{ ...baseThStyle, width: "136px" }}></th> {/* reserve empty */}
        <th style={{ ...baseThStyle, width: "70px" }}></th>
        <th style={{ ...baseThStyle }}></th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.historyId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
          <td style={{ ...baseTdStyle, paddingLeft: 40 }}>{item.date}</td>
          <td style={{ ...baseTdStyle }}>{item.category}</td>
          <td style={{ ...baseTdStyle }}></td>
          <td style={{ ...baseTdStyle }}></td>
          <td style={{ ...baseTdStyle }}></td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Common styles
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
