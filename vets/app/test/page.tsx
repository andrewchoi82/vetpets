"use client";
import React, { useState, useEffect } from 'react';
import Image from "next/image";
import { Header } from "@/components/MainHeader/Header";
import { SideBarContainer } from "@/components/MainSideBar/SideBarContainer";

export default function PDFTestPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [uploadHistory, setUploadHistory] = useState<Array<{name: string, date: string, size: string}>>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF file');
      return;
    }

    setLoading(true);
    setResult('');
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse PDF');
      }

      setResult(data.text);
      
      // Add to history
      const newHistoryItem = {
        name: file.name,
        date: new Date().toLocaleDateString(),
        size: `${(file.size / 1024).toFixed(2)} KB`
      };
      
      setUploadHistory(prev => [newHistoryItem, ...prev]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Sample history data
  useEffect(() => {
    const sampleHistory = [
      { name: "Lab Results.pdf", date: "03/16/25", size: "245.32 KB" },
      { name: "Medical Record.pdf", date: "01/16/25", size: "1024.45 KB" },
      { name: "Prescription.pdf", date: "12/16/24", size: "125.78 KB" }
    ];
    
    setUploadHistory(sampleHistory);
  }, []);

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <SideBarContainer selectedPage="PDF Parser" />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "#fff", overflowY: "auto" }}>
        <Header title="Vet Portal" />
        
        <main className="w-full bg-white h-full overflow-hidden p-6">
          <div className="flex h-full">
            <div className="w-1/3 pr-4">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2 font-medium">Select PDF File</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="pdf-upload"
                      />
                      <label htmlFor="pdf-upload" className="cursor-pointer">
                        <Image
                          src="/img/message/create.svg"
                          alt="Upload"
                          width={40}
                          height={40}
                          className="mx-auto mb-2"
                        />
                        <p className="text-gray-500">Click to browse files</p>
                      </label>
                    </div>
                    
                    {file && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-md flex items-center">
                        <div className="mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                          </svg>
                        </div>
                        <div className="flex-1 truncate">
                          <p className="font-medium text-sm">{file.name}</p>
                          <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(2)} KB</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !file}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md disabled:bg-blue-300 transition duration-200"
                  >
                    {loading ? 'Processing...' : 'Parse PDF'}
                  </button>
                </form>
                
                {error && (
                  <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>{error}</p>
                  </div>
                )}
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
              {result ? (
                <div className="bg-white rounded-lg shadow-md p-4 h-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Parsed Result</h2>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Copy to clipboard
                    </button>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-md h-[calc(100%-3rem)] overflow-y-auto whitespace-pre-wrap text-gray-700">
                    {result}
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
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No PDF Parsed Yet</h3>
                  <p className="text-gray-500 max-w-md">
                    Upload a PDF file and click "Parse PDF" to extract and view the text content here.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}