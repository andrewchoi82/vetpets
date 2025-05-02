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


export default function RecordsTable({ selectedTab, setSelectedTabAction, tabChange, setTabChange }: RecordsHeaderProps) {
  const [vaccinationsData, setVaccinationsData] = useState<Vaccination[]>([]);
  const [medicationsData, setMedicationsData] = useState<Medication[]>([]);
  const [medicalHistoryData, setMedicalHistoryData] = useState<MedicalHistory[]>([]);
  const [testData, setTestData] = useState<TestResult[]>([]);
  const [onDocumentDetail, setOnDocumentDetail] = useState(false);
  const [itemNumber, setItemNumber] = useState(-1);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [showFullAnalysisModal, setShowFullAnalysisModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [htmlComponent, setHtmlComponent] = useState('');
  const [error, setError] = useState('');
  const [analysisLoading, setAnalysisLoading] = useState(false);
  const [analysisContent, setAnalysisContent] = useState('');
  const petId = Cookies.get("petId");

  const handleAnalysis = async (fileURL: string) => {
    try {
      setLoading(true);
      setError('');
      setHtmlComponent('');

      const res = await fetch('/api/summarize-doc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: fileURL }),
      });

      const data = await res.json();
      setHtmlComponent(data.summary);
    } catch (err: any) {
      console.error('Error:', err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFullAnalysis = async (fileURL: string) => {
    try {
      setAnalysisLoading(true);
      setAnalysisContent('');

      const res = await fetch('/api/testing-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: fileURL }),
      });

      if (!res.ok) {
        throw new Error('Failed to fetch analysis');
      }

      const data = await res.json();
      if (data.analysis) {
        setAnalysisContent(data.analysis);
      } else {
        throw new Error('No analysis data received');
      }
    } catch (err: any) {
      console.error('Error:', err.message);
      setError(err.message);
      setAnalysisContent('Failed to load analysis. Please try again.');
    } finally {
      setAnalysisLoading(false);
    }
  };

  useEffect(() => {
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
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [selectedTab]);

  return (
    <div style={{ width: "100%", minHeight: "600px" }}>
      {onDocumentDetail ? (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}>
            {/* Left side - Test details */}
            <div style={{ width: '40%', paddingRight: '20px' }}>
              <div className="w-[548px] h-[849px] relative bg-black/0 overflow-hidden">
                <div className="w-96 h-5 left-[72px] top-[29px] absolute justify-center text-side-text text-xl leading-10">
                  AI-generated test results summary
                </div>
                <img src={"/img/dashboard/compGreenStatus.svg"} alt={`Green Icon`} className="w-6 h-6 left-[32px] top-[36px] absolute" />

                <div className="w-96 h-[503px] left-[68px] top-[97px] absolute justify-start">
                  <span className="text-side-text text-base leading-9">Test overview<br /></span>
                  <span className="text-side-text text-base font-normal leading-9">
                    {loading ? (
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center',
                        height: '100%'
                      }}>
                        <p>Loading summary...</p>
                      </div>
                    ) : (
                      htmlComponent
                    )}
                  </span>
                </div>
                <div data-property-1="Default" className="w-28 left-[68px] top-[616px] absolute bg-sky-800 rounded-[5px] inline-flex justify-center items-center gap-2.5">
                  <button
                    className="text-center justify-center text-white text-base font-normal leading-loose w-full h-full cursor-pointer"
                    onClick={() => setShowFullAnalysisModal(true)}
                  >
                    Full analysis
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Document preview */}
            <div style={{ width: '60%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              {pdfUrl && (
                <iframe
                  src={`${pdfUrl}#view=FitH&scrollbar=0&toolbar=0&navpanes=0`}
                  width="100%"
                  height="100%"
                  style={{
                    border: "none",
                    flexGrow: 1,
                    minHeight: "500px",
                    backgroundColor: "white"
                  }}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          {selectedTab === "vaccinations" && (
            <VaccinationTable data={vaccinationsData} />
          )}
          {selectedTab === "test results" && (
            <TestResultsTable 
              data={testData} 
              onRowClick={(index) => {
                setItemNumber(index);
                const fileToDownload = testData[index].result;
                const fileUrl = getFileUrl(fileToDownload);
                setPdfUrl(fileUrl);
                handleAnalysis(fileUrl);
                handleFullAnalysis(fileUrl);
                setOnDocumentDetail(true);
              }}
            />
          )}
          {selectedTab === "medications" && (
            <MedicationsTable data={medicationsData} />
          )}
          {selectedTab === "medical history" && (
            <MedicalHistoryTable data={medicalHistoryData} />
          )}
        </>
      )}

      {/* Full Analysis Modal */}
      {showFullAnalysisModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            width: '75%',
            height: '80%',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <button
              onClick={() => setShowFullAnalysisModal(false)}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

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
                <div dangerouslySetInnerHTML={{ __html: analysisContent }} />
              )}
            </div>
          </div>
        </div>
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
const TestResultsTable = ({ data, onRowClick }: { data: TestResult[], onRowClick: (index: number) => void }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ borderBottom: "1px solid #d1d5db" }}>
        <th style={{ ...baseThStyle, width: "176px", paddingLeft: "40px" }}>Date</th>
        <th style={{ ...baseThStyle, width: "142px" }}>Test</th>
        <th style={{ ...baseThStyle, width: "136px" }}>Status</th>
        <th style={{ ...baseThStyle, width: "70px" }}></th>
      </tr>
    </thead>
    <tbody>
      {data.map((item, index) => {
        const isCompleted = item.status === "Completed";
        return (
          <tr 
            key={item.testId} 
            style={{ 
              height: "64px", 
              borderBottom: "1px solid #e5e5e5",
              cursor: isCompleted ? "pointer" : "default"
            }}
            onClick={() => isCompleted && onRowClick(index)}
          >
            <td style={{ ...baseTdStyle, paddingLeft: 40 }}>{item.dateOrdered}</td>
            <td style={{ ...baseTdStyle }}>{item.name}</td>
            <td style={{ ...baseTdStyle }}>{item.status}</td>
            <td style={{ ...baseTdStyle }}>
              {isCompleted && (
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
                  onClick={(e) => {
                    e.stopPropagation();
                    onRowClick(index);
                  }}
                >
                  <img
                    src="/img/health-records/details-icon.svg"
                    alt="Details Icon"
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
