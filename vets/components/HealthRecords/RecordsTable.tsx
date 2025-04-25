"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getTests } from "@/app/lib/api/tests";
import { getFileUrl } from "@/app/lib/supabaseGetFile";
import { Document, Page, pdfjs } from "react-pdf";
import { getImageUrl } from "@/app/lib/supabaseGetImage";

interface RecordsHeaderProps {
  selectedTab: "vaccinations" | "test results" | "medications" | "medical history";
  setSelectedTabAction: (tab: "vaccinations" | "test results" | "medications" | "medical history") => void;
  tabChange: boolean;
  setTabChange: (change: boolean) => void;
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

  const handleAnalysis = async (fileURL: string) => {
  // const handleAnalysis = async (blob: Blob) => {
    try {
      setLoading(true);
      setError('');
      setHtmlComponent('');

      const res = await fetch('/api/summarize-doc',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: fileURL }),
      })

      const data = await res.json()

      setHtmlComponent(data.summary);
      setLoading(false);
    } catch (err: any) {
      console.error('Error:', err.message);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const data = await getTests("1"); // Hardcoded petId for now
        setTestData(data);
      } catch (error) {
        console.error("Failed to fetch test data");
      }
    };

    fetchTests();
  }, []);


  useEffect(() => {
    setOnDocumentDetail(false);
    setItemNumber(-1);
  }, [tabChange]);


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
      {onDocumentDetail === true ? (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>


          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', height: '100%' }}>
            {/* Left side - Test details */}
            <div style={{ width: '40%', paddingRight: '20px' }}>
              <div className="w-[548px] h-[849px] relative bg-black/0 overflow-hidden">
                <div className="w-96 h-5 left-[72px] top-[29px] absolute justify-center text-side-text text-xl leading-10">AI-generated blood test results summary</div>
                <img src={"/img/dashboard/compGreenStatus.svg"} alt={`Green Icon`} className=" w-6 h-6 left-[32px] top-[36px] absolute" />


                <div className="w-96 h-[503px] left-[68px] top-[97px] absolute justify-start"><span className="text-side-text text-baseleading-9">Test overview<br /></span><span className="text-side-text text-base font-normal leading-9">
                  {/* Snowball's blood test provides insights into his overall health by examining various blood components like red and white blood cells, platelets, and organ function indicators.<br /><br /></span><span className="text-side-text text-base leading-9">Conclusion</span><span className="text-side-text text-base font-normal leading-9"> <br />Snowball's overall blood results are mostly normal, but the slight elevation in Blood Urea Nitrogen (BUN) may indicate mild dehydration. No immediate concerns are noted, but keeping an eye on hydration and rechecking in the future is advised.<br /><br /> */}
                  {htmlComponent}
                  </span></div>
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
                  {testData.map((testResult, index) => {
                    const isPending = testResult.status === "Pending";
                    const iconSrc = isPending
                      ? "/img/general/yellow-circle-icon.svg"
                      : "/img/general/green-circle-icon.svg";

                    return (
                      <tr
                        key={testResult.testId}
                        style={{
                          height: "64px",
                          borderBottom: "1px solid #e5e5e5",
                          cursor: "pointer"
                        }}
                        onClick={async () => {
                          setItemNumber(index);
                          const fileToDownload = index !== -1 ?
                            testData[index].result :
                            testResult.result;

                          const fileUrl = getImageUrl(fileToDownload);
                          setPdfUrl(fileUrl);
                          handleAnalysis(fileUrl);
                          setOnDocumentDetail(true);
                        }}
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
                              onClick={async (e) => {
                                e.stopPropagation(); // Prevent row click event

                                // Determine which file to download
                                const fileToDownload = itemNumber !== -1 ?
                                  testData[itemNumber].result :
                                  testResult.result;

                                try {
                                  // Get the file URL
                                  const fileUrl = getImageUrl(fileToDownload); //filtodownload is string

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
