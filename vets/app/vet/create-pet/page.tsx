"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Header } from "@/components/MainHeader/Header";
import { useRouter } from 'next/navigation';
import { SideBarContainerVets } from '@/components/MainSideBar/SideBarContainerVets';
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import toast, { Toaster } from "react-hot-toast";

export default function PDFTestPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [uploadHistory, setUploadHistory] = useState<Array<{name: string, date: string, size: string}>>([]);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [fileResponse, setFileResponse] = useState<any>(null);
  const [matchedFields, setMatchedFields] = useState<any>(null);
  const [editableJson, setEditableJson] = useState<string>('');
  const [confirmationResult, setConfirmationResult] = useState<string>('');


  const [doctorId, setDoctorId] = useState(6);


  const Notify = (status: string, message: string) => {
    toast.dismiss();
    if (status === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const processMatchFields = async (documentText: string) => {
    try {
      const response = await fetch('/api/match-fields', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ document: documentText }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to match fields');
      }
      
      const data = await response.json();
      setMatchedFields(data);
      
      // Set the editable JSON string
      if (data && typeof data === 'object') {
        if (data.content && typeof data.content === 'string') {
          setEditableJson(JSON.stringify(JSON.parse(data.content), null, 2));
        } else {
          setEditableJson(JSON.stringify(data, null, 2));
        }
      }
    } catch (error) {
      console.error('Error matching fields:', error);
      Notify("error", "Failed to process document fields");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setError('');
      
      // Create a URL for the PDF file
      const fileUrl = URL.createObjectURL(selectedFile);
      setPdfUrl(fileUrl);
    }
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableJson(e.target.value);
  };

  const handleSaveJson = () => {
    try {
      // Validate JSON
      const parsedJson = JSON.parse(editableJson);
      setMatchedFields({ content: JSON.stringify(parsedJson) });
      Notify("success", "JSON updated successfully");
    } catch (error) {
      Notify("error", "Invalid JSON format");
    }
  };

  const handleConfirmInformation = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          doctorId: doctorId,
          content: JSON.stringify(editableJson)
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to confirm information');
      }
      
      const data = await response.json();
      setConfirmationResult(data.requestId);
      Notify("success", "Information confirmed successfully");
    } catch (error) {
      console.error('Error confirming information:', error);
      Notify("error", "Failed to confirm information");
    } finally {
      setLoading(false);
    }
  };

  // Clean up object URLs when component unmounts or when file changes
  useEffect(() => {
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
  }, [pdfUrl]);

  // Sample history data
  useEffect(() => {
    const sampleHistory = [
      { name: "Lab Results.pdf", date: "04/07/25", size: "245.32 KB" },
      { name: "Medical Record.pdf", date: "04/01/25", size: "1024.45 KB" },
      { name: "Prescription.pdf", date: "03/28/24", size: "125.78 KB" }
    ];
    
    setUploadHistory(sampleHistory);
  }, []);

  const handleClick = (href: string) => {
    router.push(href);
  };

  // Function to render JSON in a formatted way
  const renderFormattedJson = () => {
    try {
      const parsedJson = JSON.parse(editableJson);
      return (
        <div className="space-y-3">
          {Object.entries(parsedJson).map(([key, value], index) => (
            <div key={index} className="border-b border-gray-200 pb-2">
              <div className="font-medium text-gray-700">{key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</div>
              <div className="text-gray-600 pl-2">
                {typeof value === 'object' ? (
                  <div className="pl-2">
                    {Object.entries(value as object).map(([subKey, subValue], subIndex) => (
                      <div key={subIndex} className="flex flex-col mb-1">
                        <span className="text-gray-500 font-medium">{subKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}:</span>
                        <div className="pl-3">
                          {typeof subValue === 'object' ? (
                            Object.entries(subValue as object).map(([nestedKey, nestedValue], nestedIndex) => (
                              <div key={nestedIndex} className="flex">
                                <span className="text-gray-500 min-w-[120px]">{nestedKey.replace(/_/g, ' ')}:</span>
                                <span>{String(nestedValue)}</span>
                              </div>
                            ))
                          ) : (
                            <span>{String(subValue)}</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  String(value)
                )}
              </div>
            </div>
          ))}
        </div>
      );
    } catch (error) {
      return <div className="text-red-500">Invalid JSON format</div>;
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainerVets selectedPage="Create Pet" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
        <Header title="Vet Portal" showSearchBar={true}/>
        <Toaster />
        
        <main className="w-full bg-white h-full overflow-hidden p-6">
          <div className="flex h-full">
            <div className="w-1/3 pr-4">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Select PDF File</label>
                  <FilePond
                    server={{
                      process: {
                        url: "/api/parse-pdf",
                        method: "POST",
                        withCredentials: false,
                        onload: (response) => {
                          // parse the json response
                          const parsedResponse = JSON.parse(response);
                          setFileResponse(parsedResponse);
                          
                          // Process the parsed text with match-fields API
                          if (parsedResponse && parsedResponse.parsedText) {
                            processMatchFields(parsedResponse.parsedText);
                          }
                          
                          Notify("success", "PDF successfully processed");
                          return response; // Return the response to FilePond
                        },
                        onerror: (response) => {
                          Notify("error", "Failed to process PDF");
                          return response; // Return the error to FilePond
                        },
                      },
                      fetch: null,
                      revert: null,
                    }}
                  />
                </div>
                
                <div className="mt-4">
                  <div className="flex items-center gap-2">
                    <button 
                      className={`px-4 py-2 rounded-md text-white ${editableJson ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                      onClick={handleConfirmInformation}
                      disabled={!editableJson || loading}
                    >
                      {loading ? 'Processing...' : 'Get Pet ID'}
                    </button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-700 mb-1">Give this ID to client:</p>
                    <textarea
                      className="w-full p-2 text-sm bg-gray-50 border border-gray-200 rounded h-18 focus:outline-none focus:border-blue-500"
                      value={confirmationResult}
                      readOnly
                      placeholder="ID will be generated here. Give to client"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-4">Recent Uploads</h2>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {uploadHistory.map((item, index) => (
                    <div key={index} className="flex items-center p-2 hover:bg-gray-50 rounded-md cursor-pointer">
                      <div className="mr-3 text-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                          <polyline points="14 2 14 8 20 8"></polyline>
                          <line x1="16" y1="13" x2="8" y2="13"></line>
                          <line x1="16" y1="17" x2="8" y2="17"></line>
                          <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{item.date}</span>
                          <span>{item.size}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="w-2/3 pl-4">
              {matchedFields ? (
                <div className="bg-white rounded-lg shadow-md p-4 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Matched Fields</h2>
                    <div className="flex gap-2">
                      <button 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium px-3 py-1 border border-blue-600 rounded"
                        onClick={handleSaveJson}
                      >
                        Save Changes
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        onClick={() => {
                          navigator.clipboard.writeText(editableJson);
                          Notify("success", "Copied to clipboard");
                        }}
                      >
                        Copy to clipboard
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md h-[calc(100%-3rem)] overflow-y-auto">
                    <div className="flex flex-col h-full">
                      <div className="flex-1 overflow-y-auto mb-4">
                        {renderFormattedJson()}
                      </div>
                      <div className="hidden">
                        <textarea
                          className="w-full h-full p-2 font-mono text-sm bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-blue-500"
                          value={editableJson}
                          onChange={handleJsonChange}
                          spellCheck="false"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ) : pdfUrl ? (
                <div className="bg-white rounded-lg shadow-md p-4 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">{file?.name}</h2>
                    <div className="text-sm text-gray-500">{file && `${(file.size / 1024).toFixed(2)} KB`}</div>
                  </div>
                  <div className="h-[calc(100%-3rem)] rounded-md overflow-hidden">
                    <iframe 
                      src={pdfUrl} 
                      className="w-full h-full border-0" 
                      title="PDF Viewer"
                    ></iframe>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col justify-center items-center text-center">
                  <Image
                    src="/img/message/create.svg"
                    alt="Upload PDF"
                    width={80}
                    height={80}
                    className="mb-4 opacity-50"
                  />
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No PDF Processed Yet</h3>
                  <p className="text-gray-500 max-w-md">
                    Upload a PDF file using FilePond to extract and analyze document fields automatically.
                  </p>
                  <div 
                    className="h-[260px] w-[260px] flex items-center justify-center mt-4"
                    onClick={() => Notify("success", "Upload a PDF to see matched fields")}
                  >
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}