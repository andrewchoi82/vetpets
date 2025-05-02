"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Image from "next/image";
import { getFileUrl } from "@/app/lib/supabaseGetFile";
import { formatDate } from "@/app/lib/dateUtils";
import { getTests } from "@/app/lib/api/tests";
import { Document, Page, pdfjs } from "react-pdf";
import { getImageUrl } from "@/app/lib/supabaseGetImage";

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
  date: string;
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

export default function RecordsTable({ selectedTab, setSelectedTabAction, tabChange, setTabChange, records }: RecordsTableProps) {
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
  const [vaccinationsData, setVaccinationsData] = useState<Vaccination[]>([]);
  const [medicationsData, setMedicationsData] = useState<Medication[]>([]);
  const [medicalHistoryData, setMedicalHistoryData] = useState<MedicalHistory[]>([]);
  const [testData, setTestData] = useState<TestResult[]>([]);

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
      if (!petId) {
        console.log("No petId found in cookies");
        return;
      }
      console.log("Fetching data for petId:", petId);
      try {
        if (selectedTab === "vaccinations") {
          const res = await fetch(`/api/vaccinations?petId=${petId}`);
          const data = await res.json();
          console.log("Vaccinations data:", data);
          const formattedData = data.map((item: Vaccination) => ({
            ...item,
            date: item.date ? new Date(item.date).toISOString() : null
          }));
          setVaccinationsData(formattedData);
        } else if (selectedTab === "medications") {
          const res = await fetch(`/api/medications?petId=${petId}`);
          const data = await res.json();
          console.log("Medications data:", data);
          setMedicationsData(data);
        } else if (selectedTab === "medical history") {
          const res = await fetch(`/api/history?petId=${petId}`);
          const data = await res.json();
          console.log("Medical history data:", data);
          setMedicalHistoryData(data);
        } else if (selectedTab === "test results") {
          const res = await fetch(`/api/tests?petId=${petId}`);
          const data = await res.json();
          console.log("Test results data:", data);
          const formattedData = data.map((item: TestResult) => ({
            ...item,
            dateOrdered: item.dateOrdered ? new Date(item.dateOrdered).toISOString() : null,
            dateExpected: item.dateExpected ? new Date(item.dateExpected).toISOString() : null
          }));
          setTestData(formattedData);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [selectedTab, petId]);


  return (
    <div style={{ width: "100%", minHeight: "600px" }}>
      {tabChange ? (
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
            <div style={{ width: "100%" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${tableBorderColor}` }}>
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
                    <tr key={vaccination.vaccineId} style={{ height: "64px", borderBottom: `1px solid ${rowBorderColor}` }}>
                      <td style={{ ...baseTdStyle, paddingLeft: 40 }}>{formatDate(vaccination.date)}</td>
                      <td style={{ ...baseTdStyle, paddingLeft: 24 }}>{vaccination.name}</td>
                      <td style={{ ...baseTdStyle, paddingLeft: 24 }}>{vaccination.manufacturer}</td>
                      <td style={{ ...baseTdStyle, paddingLeft: 24 }}>{vaccination.dosage}</td>
                      <td style={{ ...baseTdStyle, paddingLeft: 24 }}>{vaccination.administeredBy}</td>
                      <td style={{ ...baseTdStyle, paddingLeft: 24 }}>
                        <button
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            border: "none",
                            background: "transparent",
                            color: "#4C4C4C",
                            fontSize: "15px",
                            fontWeight: 400,
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
          )}
          {selectedTab === "test results" && (
            <TestResultsTable 
              data={records} 
              onRowClick={(index) => {
                setItemNumber(index);
                const fileToDownload = records[index].result;
                const fileUrl = getFileUrl(fileToDownload);
                setPdfUrl(fileUrl);
                handleAnalysis(fileUrl);
                //handleFullAnalysis(fileUrl);
                setTabChange(true);
              }}
            />
          )}
          {selectedTab === "medications" && (
            <div style={{ width: "100%" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${tableBorderColor}` }}>
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
                      <tr key={medication.medicationId} style={{ height: "64px", borderBottom: `1px solid ${rowBorderColor}` }}>
                        <td style={{ ...baseTdStyle, paddingLeft: 40 }}>{formatDate(medication.date)}</td>
                        <td style={{ ...baseTdStyle, paddingLeft: 24 }}>{medication.medication}</td>
                        <td style={{ ...baseTdStyle, paddingLeft: 24 }}>{medication.frequency}</td>
                        <td style={{ ...baseTdStyle, paddingLeft: 24 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <img src={iconSrc} alt={`${medication.status} Icon`} style={{ width: "16px", height: "16px" }} />
                            {medication.status}
                          </div>
                        </td>
                        <td style={{ ...baseTdStyle, paddingLeft: 24 }}>
                          <button
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              border: "none",
                              background: "transparent",
                              color: "#4C4C4C",
                              fontSize: "15px",
                              fontWeight: 400,
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
                            <span style={{ textDecoration: "underline", marginLeft: "17px", fontSize: 17 }}>Instructions</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          {selectedTab === "medical history" && (
            <div style={{ width: "100%" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${tableBorderColor}` }}>
                    <th style={{ ...baseThStyle, paddingLeft: 40, width: "160px" }}>Date</th>
                    <th style={{ ...baseThStyle, paddingLeft: 24, width: "360px" }}>Category</th>
                    <th style={{ ...baseThStyle, paddingLeft: 24, width: "120px" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {medicalHistoryData.map((history) => (
                    <tr key={history.historyId} style={{ height: "64px", borderBottom: `1px solid ${rowBorderColor}` }}>
                      <td style={{ ...baseTdStyle, paddingLeft: 40 }}>{formatDate(history.date)}</td>
                      <td style={{ ...baseTdStyle, paddingLeft: 24 }}>{history.category}</td>
                      <td style={{ ...baseTdStyle, paddingLeft: 24 }}>
                        <button
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                            border: "none",
                            background: "transparent",
                            color: "#4C4C4C",
                            fontSize: "15px",
                            fontWeight: 400,
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
          )}
        </>
      )}

      {/* Full Analysis Modal
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
      )} */}

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
            overflowY: 'auto'
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

            {/* {htmlComponent && (
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: htmlComponent }}
              />
            )} */}
            <div className="p-4">
              {/* Chemistry Panel Table */}
              <h2 className="text-xl font-semibold mb-4">Chemistry Panel – Organ Function & Metabolism</h2>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-300 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border border-gray-300 px-4 py-2 text-left">Test</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">What It Measures</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Result</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Normal Range</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["ALP", "Liver & bone enzyme", "163 U/L", "5–160 U/L", "Slightly high – may happen with liver stress, medications, or age. Often mild and not urgent."],
                      ["ALT", "Liver enzyme", "61 U/L", "18–121 U/L", "Normal – liver cells are not inflamed or damaged."],
                      ["AST", "Liver/muscle enzyme", "27 U/L", "16–55 U/L", "Normal – no signs of muscle or liver damage."],
                      ["GGT", "Bile duct enzyme", "8 U/L", "0–13 U/L", "Normal – no issues with bile flow."],
                      ["BUN", "Kidney waste filter", "41 mg/dL", "9–31 mg/dL", "High – may indicate dehydration or stress on kidneys. Could also be a high-protein diet."],
                      ["Creatinine", "Kidney function", "0.9 mg/dL", "0.5–1.5 mg/dL", "Normal – kidneys are likely working properly."],
                      ["BUN/Creatinine Ratio", "Kidney hydration balance", "45.6", "-", "High ratio confirms possible dehydration or early kidney stress."],
                      ["TCO₂ (Bicarbonate)", "Acid/base balance", "16 mmol/L", "13–27 mmol/L", "Normal – good body pH balance."],
                      ["Glucose", "Blood sugar", "92 mg/dL", "63–114 mg/dL", "Normal – no sign of diabetes."],
                      ["Cholesterol", "Fat in blood", "194 mg/dL", "131–345 mg/dL", "Normal – healthy fat balance."],
                      ["Calcium", "Bone/nerve health", "9.7 mg/dL", "8.4–11.8 mg/dL", "Normal – bones, muscles, nerves are supported."],
                      ["Phosphorus", "Bone & kidney balance", "4.1 mg/dL", "2.5–6.1 mg/dL", "Normal."],
                      ["Albumin", "Main blood protein", "3.0 g/dL", "2.7–3.9 g/dL", "Normal – helps control fluid balance."],
                      ["Globulin", "Immune proteins", "3.8 g/dL", "2.4–4.0 g/dL", "Normal – immune system function."],
                      ["Total Protein", "Albumin + globulin", "6.8 g/dL", "5.5–7.5 g/dL", "Normal – overall protein health."],
                      ["Total Bilirubin", "Liver waste", "0.1 mg/dL", "0–0.3 mg/dL", "Normal – liver is clearing waste."],
                      ["Unconjugated Bilirubin", "Pre-liver bilirubin", "0.0 mg/dL", "0.0–0.2 mg/dL", "Normal."],
                      ["Conjugated Bilirubin", "Post-liver bilirubin", "0.1 mg/dL", "0.0–0.1 mg/dL", "Normal."],
                      ["CK (Creatine Kinase)", "Muscle damage", "104 U/L", "10–200 U/L", "Normal – no sign of muscle injury."],
                      ["Na (Sodium)", "Hydration & nerves", "148 mmol/L", "142–152 mmol/L", "Normal – no dehydration or imbalance."],
                      ["K (Potassium)", "Muscle & heart function", "4.6 mmol/L", "4.0–5.4 mmol/L", "Normal – stable electrolyte."],
                      ["Cl (Chloride)", "Blood acid balance", "119 mmol/L", "108–119 mmol/L", "At upper limit – not concerning."],
                      ["Na/K Ratio", "Electrolyte check", "32", "28–37", "Normal."],
                      ["Albumin/Globulin Ratio", "Protein balance", "0.8", "0.7–1.5", "Normal."]
                    ].map(([test, measure, result, range, meaning], idx) => (
                      <tr key={idx}>
                        <td className="border border-gray-300 px-4 py-2">{test}</td>
                        <td className="border border-gray-300 px-4 py-2">{measure}</td>
                        <td className="border border-gray-300 px-4 py-2">{result}</td>
                        <td className="border border-gray-300 px-4 py-2">{range}</td>
                        <td className="border border-gray-300 px-4 py-2">{meaning}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Sample Condition Flags and Summary */}
              <div className="mt-8 space-y-4 text-sm text-gray-800">
                <h3 className="text-lg font-semibold">Sample Condition Flags</h3>
                <p><strong>Hemolysis:</strong> +++ – Some red blood cells broke during collection – may affect liver or muscle enzymes slightly.</p>
                <p><strong>Lipemia:</strong> Normal – No extra fat in sample – great!</p>

                <h3 className="text-lg font-semibold mt-6">Summary for Pet Parents</h3>
                <p><strong>Your pet's liver, kidney, and glucose values are mostly normal.</strong></p>
                <p><strong>Slightly high ALP and high BUN could mean:</strong></p>
                <ul className="list-disc list-inside ml-4">
                  <li>Mild dehydration</li>
                  <li>Age-related changes (especially in senior dogs)</li>
                  <li>Possibly diet or medications (especially if on steroids or high-protein food)</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}

// Common styles
const baseThStyle = {
  height: "64px",
  fontSize: "17px",
  fontWeight: 400,
  fontFamily: "Inter",
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

// Table border colors
const tableBorderColor = "#d1d5db";
const rowBorderColor = "#e5e5e5";

// Button styles
const buttonStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  border: "none",
  background: "transparent",
  color: "#4C4C4C",
  fontSize: "15px",
  fontWeight: 400,
  cursor: "pointer",
  padding: 0,
};
// Vaccinations Table
const VaccinationTable = ({ data }: { data: Vaccination[] }) => {
  console.log("Rendering VaccinationTable with data:", data);
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${tableBorderColor}` }}>
          <th style={{ ...baseThStyle, width: "176px", paddingLeft: "40px" }}>Date</th>
          <th style={{ ...baseThStyle, width: "142px" }}>Vaccine</th>
          <th style={{ ...baseThStyle, width: "136px" }}>Manufacturer</th>
          <th style={{ ...baseThStyle, width: "70px" }}>Dosage</th>
          <th style={{ ...baseThStyle }}>Administered by</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => {
          console.log("Processing vaccination item:", item);
          return (
            <tr key={item.vaccineId} style={{ height: "64px", borderBottom: `1px solid ${rowBorderColor}` }}>
              <td style={{ ...baseTdStyle, paddingLeft: "40px" }}>
                {item.date ? formatDate(item.date) : 'N/A'}
              </td>
              <td style={baseTdStyle}>{item.name}</td>
              <td style={baseTdStyle}>{item.manufacturer}</td>
              <td style={baseTdStyle}>{item.dosage} mL</td>
              <td style={baseTdStyle}>{item.administeredBy}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// Test Results Table
const TestResultsTable = ({ data, onRowClick }: { data: TestResult[], onRowClick: (index: number) => void }) => {
  console.log("Rendering TestResultsTable with data:", data);
  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: `1px solid ${tableBorderColor}` }}>
          <th style={{ ...baseThStyle, width: "176px", paddingLeft: "40px" }}>Date</th>
          <th style={{ ...baseThStyle, width: "142px" }}>Test</th>
          <th style={{ ...baseThStyle, width: "136px" }}>Status</th>
          <th style={{ ...baseThStyle, width: "70px" }}></th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => {
          console.log("Processing test result item:", item);
          const isCompleted = item.status === "Completed";
          return (
            <tr 
              key={item.testId} 
              style={{ 
                height: "64px", 
                borderBottom: `1px solid ${rowBorderColor}`,
                cursor: isCompleted ? "pointer" : "default"
              }}
              onClick={() => isCompleted && onRowClick(index)}
            >
              <td style={{ ...baseTdStyle, paddingLeft: "40px" }}>
                {item.dateOrdered ? formatDate(item.dateOrdered) : 'N/A'}
              </td>
              <td style={baseTdStyle}>{item.name}</td>
              <td style={baseTdStyle}>{item.status}</td>
              <td style={baseTdStyle}>
                {isCompleted && (
                  <button
                    style={buttonStyle}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRowClick(index);
                    }}
                  >
                    <img
                      src="/img/health-records/details-icon.svg"
                      alt="Details Icon"
                      style={{ width: "18px", height: "18px", marginTop: "4px" }}
                    />
                    <span style={{ textDecoration: "underline" }}>Results</span>
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

// Medications Table
const MedicationsTable = ({ data }: { data: Medication[] }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ borderBottom: `1px solid ${tableBorderColor}` }}>
        <th style={{ ...baseThStyle, width: "176px", paddingLeft: "40px" }}>Date</th>
        <th style={{ ...baseThStyle, width: "142px" }}>Medication</th>
        <th style={{ ...baseThStyle, width: "136px" }}>Frequency</th>
        <th style={{ ...baseThStyle, width: "70px" }}>Status</th>
        <th style={{ ...baseThStyle }}></th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.medicationId} style={{ height: "64px", borderBottom: `1px solid ${rowBorderColor}` }}>
          <td style={{ ...baseTdStyle, paddingLeft: "40px" }}>
            {item.date ? formatDate(item.date) : 'N/A'}
          </td>
          <td style={baseTdStyle}>{item.medication}</td>
          <td style={baseTdStyle}>{item.frequency}</td>
          <td style={baseTdStyle}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <img
                src={item.status === "Ongoing" ? "/img/general/yellow-circle-icon.svg" : "/img/general/green-circle-icon.svg"}
                alt={`${item.status} Icon`}
                style={{ width: "16px", height: "16px", marginTop: "1px" }}
              />
              {item.status}
            </div>
          </td>
          <td style={baseTdStyle}>
            <button
              style={buttonStyle}
              onClick={() => handleDownload(item.details)}
            >
              <img
                src="/img/health-records/details-icon.svg"
                alt="Download Icon"
                style={{ width: "18px", height: "18px", marginTop: "4px" }}
              />
              <span style={{ textDecoration: "underline" }}>Instructions</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

// Medical History Table
const MedicalHistoryTable = ({ data }: { data: MedicalHistory[] }) => (
  <table style={{ width: "100%", borderCollapse: "collapse" }}>
    <thead>
      <tr style={{ borderBottom: `1px solid ${tableBorderColor}` }}>
        <th style={{ ...baseThStyle, width: "176px", paddingLeft: "40px" }}>Date</th>
        <th style={{ ...baseThStyle, width: "142px" }}>Category</th>
        <th style={{ ...baseThStyle, width: "136px" }}></th>
        <th style={{ ...baseThStyle, width: "70px" }}></th>
        <th style={{ ...baseThStyle }}></th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.historyId} style={{ height: "64px", borderBottom: `1px solid ${rowBorderColor}` }}>
          <td style={{ ...baseTdStyle, paddingLeft: "40px" }}>
            {item.date ? formatDate(item.date) : 'N/A'}
          </td>
          <td style={baseTdStyle}>{item.category}</td>
          <td style={baseTdStyle}></td>
          <td style={baseTdStyle}></td>
          <td style={baseTdStyle}>
            <button
              style={buttonStyle}
              onClick={() => handleDownload(item.details)}
            >
              <img
                src="/img/health-records/details-icon.svg"
                alt="Download Icon"
                style={{ width: "18px", height: "18px", marginTop: "4px" }}
              />
              <span style={{ textDecoration: "underline" }}>Details</span>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

