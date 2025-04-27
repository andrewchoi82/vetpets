"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getTests } from "@/app/lib/api/tests";
import { getFileUrl } from "@/app/lib/supabaseGetFile";
import { Document, Page, pdfjs } from "react-pdf";
import { getImageUrl } from "@/app/lib/supabaseGetImage";
import Cookies from 'js-cookie';

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

export default function RecordsTable({ selectedTab, setSelectedTabAction, tabChange, setTabChange }: RecordsHeaderProps) {

  type TestResult = {
    testId: number;
    petId: number;
    name: string;
    dateOrdered: string;
    dateExpected: string;
    status: string;
    result: string;
  };

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

  const [vaccinationsData, setVaccinationsData] = useState<Vaccination[]>([]);
  const [medicationsData, setMedicationsData] = useState<Medication[]>([]);
  const [medicalHistoryData, setMedicalHistoryData] = useState<MedicalHistory[]>([]);
  const petId = Cookies.get('petId');

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
      setError('');
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
      if (data.summary) {
        setAnalysisContent(data.summary);
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
    const fetchTests = async () => {
      if (!petId) return;
      try {
        const response = await fetch(`/api/tests?petId=${petId}`);
        const data = await response.json();
        setTestData(data);
      } catch (error) {
        console.error("Failed to fetch test data");
      }
    };

    fetchTests();
  }, [petId]);

  useEffect(() => {
    setOnDocumentDetail(false);
    setItemNumber(-1);
  }, [tabChange]);

  useEffect(() => {
    const fetchData = async () => {
      if (!petId) return;

      setLoading(true);
      try {
        if (selectedTab === "vaccinations") {
          const response = await fetch(`/api/vaccinations?petId=${petId}`);
          const data = await response.json();
          setVaccinationsData(data);
        } else if (selectedTab === "medications") {
          const response = await fetch(`/api/medications?petId=${petId}`);
          const data = await response.json();
          setMedicationsData(data);
        } else if (selectedTab === "medical history") {
          const response = await fetch(`/api/history?petId=${petId}`);
          const data = await response.json();
          setMedicalHistoryData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTab]);

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

  return (
    <>
      {onDocumentDetail === true ? (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>


          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}>
            {/* Left side - Test details */}
            <div style={{ width: '40%', paddingRight: '20px' }}>
              <div className="w-[548px] h-[849px] relative bg-black/0 overflow-hidden">
                <div className="w-96 h-5 left-[72px] top-[29px] absolute justify-center text-side-text text-xl leading-10">AI-generated blood test results summary</div>
                <img src={"/img/dashboard/compGreenStatus.svg"} alt={`Green Icon`} className=" w-6 h-6 left-[32px] top-[36px] absolute" />


                <div className="w-96 h-[503px] left-[68px] top-[97px] absolute justify-start">
                  <span className="text-side-text text-baseleading-9">Test overview<br /></span>
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
        </div >
      ) :


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
                  {vaccinationsData.map((vaccination) => (
                    <tr key={vaccination.vaccineId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                      <td style={{ paddingLeft: 40, color: "#111827" }}>{new Date().toLocaleDateString()}</td>
                      <td style={{ paddingLeft: 24, color: "#111827" }}>{vaccination.name}</td>
                      <td style={{ paddingLeft: 24, color: "#111827" }}>{vaccination.manufacturer}</td>
                      <td style={{ paddingLeft: 24, color: "#111827" }}>{vaccination.dosage}</td>
                      <td style={{ paddingLeft: 24, color: "#111827" }}>{vaccination.administeredBy}</td>
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
                          onClick={() => handleDownload(vaccination.details)}
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
                  {testData.map((testResult, index) => {
                    const isPending = testResult.result === "";
                    const isCompleted = testResult.result !== "";
                    const iconSrc = isPending
                      ? "/img/general/yellow-circle-icon.svg"
                      : "/img/general/green-circle-icon.svg";

                    return (
                      <tr
                        key={testResult.testId}
                        style={{
                          height: "64px",
                          borderBottom: "1px solid #e5e5e5",
                          cursor: isCompleted ? "pointer" : "default"
                        }}
                        onClick={isCompleted ? async () => {
                          setItemNumber(index);
                          const fileToDownload = index !== -1 ?
                            testData[index].result :
                            testResult.result;

                          const fileUrl = getFileUrl(fileToDownload);
                          setPdfUrl(fileUrl);
                          handleAnalysis(fileUrl);
                          handleFullAnalysis(fileUrl);
                          setOnDocumentDetail(true);
                        } : undefined}
                      >
                        <td style={{ paddingLeft: 40, color: "#111827" }}>{testResult.dateOrdered}</td>
                        <td style={{ paddingLeft: 24, color: "#111827" }}>{testResult.name}</td>
                        <td style={{ paddingLeft: 24 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#111827" }}>
                            <img src={iconSrc} alt={`${testResult.status} Icon`} style={{ width: "16px", height: "16px" }} />
                            {testResult.status}
                          </div>
                        </td>
                        <td style={{ paddingLeft: 24 }}>
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
                              onClick={async (e) => {
                                e.stopPropagation(); // Prevent row click event

                                // Determine which file to download
                                const fileToDownload = itemNumber !== -1 ?
                                  testData[itemNumber].result :
                                  testResult.result;

                                try {
                                  // Get the file URL
                                  const fileUrl = getImageUrl(fileToDownload);

                                  // Fetch the file as a blob
                                  const response = await fetch(fileUrl);
                                  const blob = await response.blob();

                                  // Create a URL for the blob
                                  const blobUrl = window.URL.createObjectURL(blob);

                                  // Create a temporary anchor element to trigger download
                                  const a = document.createElement('a');
                                  a.href = blobUrl;
                                  a.download = fileToDownload;
                                  a.style.display = 'none';

                                  // Append to body, click, and clean up
                                  document.body.appendChild(a);
                                  a.click();

                                  // Clean up
                                  window.URL.revokeObjectURL(blobUrl);
                                  document.body.removeChild(a);
                                } catch (error) {
                                  console.error("Error downloading file:", error);
                                }
                              }}
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
                  {medicationsData.map((medication) => {
                    const isActive = medication.status === "Ongoing";
                    const iconSrc = isActive
                      ? "/img/general/yellow-circle-icon.svg"
                      : "/img/general/green-circle-icon.svg";

                    return (
                      <tr key={medication.medicationId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                        <td style={{ paddingLeft: 40, color: "#111827" }}>{medication.date}</td>
                        <td style={{ paddingLeft: 24, color: "#111827" }}>{medication.medication}</td>
                        <td style={{ paddingLeft: 24, color: "#111827" }}>{medication.frequency}</td>
                        <td style={{ paddingLeft: 24 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#111827" }}>
                            <img src={iconSrc} alt={`${medication.status} Icon`} style={{ width: "16px", height: "16px" }} />
                            {medication.status}
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
                            onClick={() => handleDownload(medication.details)}
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
                  {medicalHistoryData.map((history) => (
                    <tr key={history.historyId} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                      <td style={{ paddingLeft: 40, color: "#111827" }}>{history.date}</td>
                      <td style={{ paddingLeft: 24, color: "#111827" }}>{history.category}</td>
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
                          onClick={() => handleDownload(history.details)}
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
      }

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
                <div className="text-side-text text-base font-normal leading-9">
                  {analysisContent}
                </div>
              )}
            </div>
          </div>
        </div>
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
