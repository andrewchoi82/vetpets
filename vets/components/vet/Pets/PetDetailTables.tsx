"use client";
import React, { useEffect, useState } from "react";
import { getFileUrl } from "@/app/lib/supabaseGetFile";
import Cookies from "js-cookie";
import { uploadImage, uploadDocument } from '@/app/lib/supabaseUpload';

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
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysisContent, setAnalysisContent] = useState<string>("");

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
          const res = await fetch(`/api/history?petId=${petId}`);
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

  const handleDownload = async (details: string) => {
    try {
      const fileUrl = getFileUrl(details);
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = details;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleUpload = async (file: File, id: number, type: 'test' | 'medication' | 'history') => {
    try {
      const fileName = await uploadDocument(file);
      if (fileName) {
        const endpoint = type === 'test' ? '/api/tests' : 
                        type === 'medication' ? '/api/medications' : 
                        '/api/history';
        
        const response = await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...(type === 'test' ? { testId: id, result: fileName, status: 'Completed' } : 
                type === 'medication' ? { medicationId: id, details: fileName, status: 'Completed' } :
                { historyId: id, details: fileName })
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update record');
        }

        // Refresh the data
        setTabChange(!tabChange);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, id: number, type: 'test' | 'medication' | 'history') => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0], id, type);
    }
  };

  const handleAnalysis = async (details: string) => {
    setAnalysisLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/testing-analysis?details=${encodeURIComponent(details)}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setAnalysisContent(data.summary);
      }
    } catch (error) {
      console.error('Error fetching analysis:', error);
      setError('An error occurred while fetching analysis.');
    } finally {
      setAnalysisLoading(false);
    }
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
              <th style={{ ...baseThStyle, paddingLeft: 24 }}></th>
            </tr>
          </thead>
          <tbody>
            {renderLoadingOrNoData(testData.length, 4, "No test results found.")}
            {!loading &&
              testData.map((testResult) => (
                <tr key={testResult.testId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ paddingLeft: 40 }}>{formatDate(testResult.dateOrdered)}</td>
                  <td style={{ paddingLeft: 24 }}>{testResult.name}</td>
                  <td style={{ paddingLeft: 24 }}>{testResult.status}</td>
                  <td style={{ paddingLeft: 24 }}>
                    {testResult.result ? (
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
                        onClick={() => handleDownload(testResult.result)}
                      >
                        <img
                          src="/img/health-records/details-icon.svg"
                          alt="Download Icon"
                          style={{ width: "17px", height: "17px" }}
                        />
                        <span style={{ textDecoration: "underline" }}>Results</span>
                      </button>
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          accept="application/pdf,image/*"
                          onChange={(e) => handleFileChange(e, testResult.testId, 'test')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
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
                        >
                          <img
                          src="/img/health-records/details-icon.svg"
                          alt="Download Icon"
                          style={{ width: "17px", height: "17px" }}
                        />
                          <span style={{ textDecoration: "underline" }}>Upload Results</span>
                        </button>
                      </div>
                    )}
                  </td>
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
              <th style={{ ...baseThStyle, paddingLeft: 24 }}></th>
            </tr>
          </thead>
          <tbody>
            {renderLoadingOrNoData(medicationsData.length, 5, "No medications found.")}
            {!loading &&
              medicationsData.map((medication) => (
                <tr key={medication.medicationId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ paddingLeft: 40 }}>{formatDate(medication.date)}</td>
                  <td style={{ paddingLeft: 24 }}>{medication.medication}</td>
                  <td style={{ paddingLeft: 24 }}>{medication.frequency}</td>
                  <td style={{ paddingLeft: 24 }}>{medication.status}</td>
                  <td style={{ paddingLeft: 24 }}>
                    {medication.details ? (
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
                        onClick={() => handleDownload(medication.details)}
                      >
                        <img
                          src="/img/health-records/details-icon.svg"
                          alt="Download Icon"
                          style={{ width: "17px", height: "17px" }}
                        />
                        <span style={{ textDecoration: "underline" }}>Instructions</span>
                      </button>
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          accept="application/pdf,image/*"
                          onChange={(e) => handleFileChange(e, medication.medicationId, 'medication')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
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
                        >
                         <img
                          src="/img/health-records/details-icon.svg"
                          alt="Download Icon"
                          style={{ width: "17px", height: "17px" }}
                        />
                          <span style={{ textDecoration: "underline" }}>Upload Instructions</span>
                        </button>
                      </div>
                    )}
                  </td>
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
              <th style={{ ...baseThStyle, paddingLeft: 24 }}></th>
            </tr>
          </thead>
          <tbody>
            {renderLoadingOrNoData(medicalHistoryData.length, 3, "No medical history found.")}
            {!loading &&
              medicalHistoryData.map((history) => (
                <tr key={history.historyId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                  <td style={{ paddingLeft: 40 }}>{formatDate(history.date)}</td>
                  <td style={{ paddingLeft: 24 }}>{history.category}</td>
                  <td style={{ paddingLeft: 24 }}>
                    {history.details ? (
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
                        onClick={() => handleDownload(history.details)}
                      >
                        <img
                          src="/img/health-records/details-icon.svg"
                          alt="Download Icon"
                          style={{ width: "17px", height: "17px" }}
                        />
                        <span style={{ textDecoration: "underline" }}>Details</span>
                      </button>
                    ) : (
                      <div className="relative">
                        <input
                          type="file"
                          accept="application/pdf,image/*"
                          onChange={(e) => handleFileChange(e, history.historyId, 'history')}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
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
                        >
                          <img
                          src="/img/health-records/details-icon.svg"
                          alt="Download Icon"
                          style={{ width: "17px", height: "17px" }}
                        />
                          <span style={{ textDecoration: "underline" }}>Upload Details</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <div style={{ 
        flex: 1, 
        overflowY: 'auto',
        padding: '20px',
        marginTop: '20px'
      }}>
        {analysisLoading ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%'
          }}>
            <p>Loading analysis...</p>
          </div>
        ) : error ? (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            height: '100%',
            color: 'red'
          }}>
            <p>{error}</p>
          </div>
        ) : (
          <div className="text-side-text text-base font-normal leading-9">
            {analysisContent}
          </div>
        )}
      </div>
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
