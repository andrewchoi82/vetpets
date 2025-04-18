"use client";

import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export default function FileUpload() {
  const [fileResponse, setFileResponse] = useState(null);
  const [matchedFields, setMatchedFields] = useState(null);

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
    } catch (error) {
      console.error('Error matching fields:', error);
      Notify("error", "Failed to process document fields");
    }
  };

  return (
    <div>
      <Toaster />
      <FilePond
        server={{
          process: {
            url: "/api/parse-pdf",
            method: "POST",
            withCredentials: false,
            onload: (response) => {
              // parse the json response
              const fileResponse = JSON.parse(response);
              setFileResponse(fileResponse);
              
              // Process the parsed text with match-fields API
              if (fileResponse && fileResponse.parsedText) {
                processMatchFields(fileResponse.parsedText);
              }
              
              return response; // Return the response to FilePond
            },
            onerror: (response) => {
              return response; // Return the error to FilePond
            },
          },
          fetch: null,
          revert: null,
        }}
      />

      <div>
        {fileResponse ? (
          <div className="p-5">
            <h1 className="font-black text-xl">Text from the Pdf :-</h1>
            {/* @ts-expect-error - This is needed because it giving parsedText is not found on type never */}
            <pre className="text-wrap p-5">{fileResponse.parsedText}</pre>
            
            {matchedFields && (
              <div className="mt-5">
                <h1 className="font-black text-xl">Matched Fields :-</h1>
                <pre className="text-wrap p-5 bg-gray-100 rounded-md overflow-auto">
                  {matchedFields.content && typeof matchedFields.content === 'string' 
                    ? JSON.stringify(JSON.parse(matchedFields.content), null, 2)
                    : JSON.stringify(matchedFields, null, 2)
                  }
                </pre>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-2 justify-center items-center">
            <h2 className="font-bold mt-10">Upload a file to chat</h2>
            <p>Supported file types: PDF</p>
            <div
              className="h-[260px] w-[260px]"
              onClick={() => Notify("success", "upload a pdf")}
            >
            </div>
          </div>
        )}
      </div>
    </div>
  );
}