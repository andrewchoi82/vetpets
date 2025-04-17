"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getTests } from "@/app/lib/api/tests";
import { getImageUrl } from "@/app/lib/supabaseGetFile";


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

  const handleAnalysis = async (blob: any) => {
    try {
      setLoading(true);
      setError('');
      setHtmlComponent('');

      // Fetch the blob data
      // const response = await fetch(blobUrl);
      // const blob = await response.blob();
      
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      
      reader.onloadend = async () => {
        const base64data = reader.result as string;

        const res1 = await fetch('/api/summarze-doc', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileData: base64data }),
        });
        const data1= await res1.json();
        console.log(data1);

        
        // Send the base64 data to the API
        const res = await fetch('/api/testing-analysis', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ fileData: base64data }),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || 'Failed to analyze lab report');
        }

        setHtmlComponent(data.component); // This is the HTML <div> as a string
        setLoading(false);
      };
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
                <img src={"img/dashboard/compGreenStatus.svg"} alt={`Green Icon`} className = " w-6 h-6 left-[32px] top-[36px] absolute" />


                <div className="w-96 h-[503px] left-[68px] top-[97px] absolute justify-start"><span className="text-side-text text-baseleading-9">Test overview<br /></span><span className="text-side-text text-base font-normal leading-9">Snowball's blood test provides insights into his overall health by examining various blood components like red and white blood cells, platelets, and organ function indicators.<br /><br /></span><span className="text-side-text text-base leading-9">Conclusion</span><span className="text-side-text text-base font-normal leading-9"> <br />Snowball's overall blood results are mostly normal, but the slight elevation in Blood Urea Nitrogen (BUN) may indicate mild dehydration. No immediate concerns are noted, but keeping an eye on hydration and rechecking in the future is advised.<br /><br /></span></div>
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

                          const response = await fetch(fileUrl);
                          const blob = await response.blob();
                          const blobUrl = window.URL.createObjectURL(blob);

                          setPdfUrl(blobUrl);
                          handleAnalysis(blob);


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
            {error && <p className="text-red-600">{error}</p>}

{htmlComponent && (
  <div
    className="mt-4"
    dangerouslySetInnerHTML={{ __html: htmlComponent }}
  />
)}
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
