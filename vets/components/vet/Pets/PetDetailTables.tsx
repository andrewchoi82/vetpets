"use client";
import React, { useEffect, useState } from "react";
import { getFileUrl } from "@/app/lib/supabaseGetFile";
import Cookies from "js-cookie";

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

type TestResult = {
  testId: number;
  petId: number;
  name: string;
  dateOrdered: string;
  dateExpected: string;
  status: string;
  result: string;
};

export default function RecordsTable({
  selectedTab,
  setSelectedTabAction,
  tabChange,
  setTabChange,
}: RecordsHeaderProps) {
  const [testData, setTestData] = useState<TestResult[]>([]);
  const [vaccinationsData, setVaccinationsData] = useState<Vaccination[]>([]);
  const [medicationsData, setMedicationsData] = useState<Medication[]>([]);
  const [medicalHistoryData, setMedicalHistoryData] = useState<MedicalHistory[]>([]);
  const [loading, setLoading] = useState(false);
  const petId = Cookies.get("petId");

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      if (!petId) return;
      try {
        if (selectedTab === "vaccinations") {
          const res = await fetch(`/api/vaccinations?petId=${petId}`);
          const data = await res.json();
          setVaccinationsData(data);
        } else if (selectedTab === "medications") {
          const res = await fetch(`/api/medications?petId=${petId}`);
          const data = await res.json();
          setMedicationsData(data);
        } else if (selectedTab === "medical history") {
          const res = await fetch(`/api/medical-history?petId=${petId}`);
          const data = await res.json();
          setMedicalHistoryData(data);
        } else if (selectedTab === "test results") {
          const res = await fetch(`/api/tests?petId=${petId}`);
          const data = await res.json();
          setTestData(data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab, tabChange]);

  const renderLoadingOrNoData = (dataLength: number, colSpan: number, message: string) => {
    if (loading) {
      return (
        <tr>
          <td colSpan={colSpan} style={{ textAlign: "center", padding: "20px" }}>
            Loading...
          </td>
        </tr>
      );
    } else if (dataLength === 0) {
      return (
        <tr>
          <td colSpan={colSpan} style={{ textAlign: "center", padding: "20px" }}>
            {message}
          </td>
        </tr>
      );
    }
    return null;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <>
      {selectedTab === "vaccinations" && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #d1d5db" }}>
              <th style={{ ...baseThStyle, paddingLeft: 40 }}>Date</th>
              <th style={{ ...baseThStyle, paddingLeft: 24 }}>Vaccine</th>
              <th style={{ ...baseThStyle, paddingLeft: 24 }}>Manufacturer</th>
              <th style={{ ...baseThStyle, paddingLeft: 24 }}>Dosage</th>
              <th style={{ ...baseThStyle, paddingLeft: 24 }}>Administered By</th>
            </tr>
          </thead>
          <tbody>
            {renderLoadingOrNoData(vaccinationsData.length, 5, "No vaccinations found.")}
            {!loading &&
              vaccinationsData.map((vaccination) => (
                <tr key={vaccination.vaccineId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ paddingLeft: 40 }}>{new Date().toLocaleDateString()}</td>
                  <td style={{ paddingLeft: 24 }}>{vaccination.name}</td>
                  <td style={{ paddingLeft: 24 }}>{vaccination.manufacturer}</td>
                  <td style={{ paddingLeft: 24 }}>{vaccination.dosage}</td>
                  <td style={{ paddingLeft: 24 }}>{vaccination.administeredBy}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {selectedTab === "test results" && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #d1d5db" }}>
              <th style={{ ...baseThStyle, paddingLeft: 40 }}>Date</th>
              <th style={{ ...baseThStyle, paddingLeft: 24 }}>Test</th>
              <th style={{ ...baseThStyle, paddingLeft: 24 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {renderLoadingOrNoData(testData.length, 3, "No test results found.")}
            {!loading &&
              testData.map((testResult) => (
                <tr key={testResult.testId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ paddingLeft: 40 }}>{formatDate(testResult.dateOrdered)}</td>
                  <td style={{ paddingLeft: 24 }}>{testResult.name}</td>
                  <td style={{ paddingLeft: 24 }}>{testResult.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {selectedTab === "medications" && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #d1d5db" }}>
              <th style={{ ...baseThStyle, paddingLeft: 40 }}>Date</th>
              <th style={{ ...baseThStyle, paddingLeft: 24 }}>Medication</th>
              <th style={{ ...baseThStyle, paddingLeft: 24 }}>Frequency</th>
              <th style={{ ...baseThStyle, paddingLeft: 24 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {renderLoadingOrNoData(medicationsData.length, 4, "No medications found.")}
            {!loading &&
              medicationsData.map((medication) => (
                <tr key={medication.medicationId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ paddingLeft: 40 }}>{formatDate(medication.date)}</td>
                  <td style={{ paddingLeft: 24 }}>{medication.medication}</td>
                  <td style={{ paddingLeft: 24 }}>{medication.frequency}</td>
                  <td style={{ paddingLeft: 24 }}>{medication.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      {selectedTab === "medical history" && (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #d1d5db" }}>
              <th style={{ ...baseThStyle, paddingLeft: 40 }}>Date</th>
              <th style={{ ...baseThStyle, paddingLeft: 24 }}>Category</th>
            </tr>
          </thead>
          <tbody>
            {renderLoadingOrNoData(medicalHistoryData.length, 2, "No medical history found.")}
            {!loading &&
              medicalHistoryData.map((history) => (
                <tr key={history.historyId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ paddingLeft: 40 }}>{formatDate(history.date)}</td>
                  <td style={{ paddingLeft: 24 }}>{history.category}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
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
