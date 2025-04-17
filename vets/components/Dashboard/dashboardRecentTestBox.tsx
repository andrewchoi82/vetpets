"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";

interface Test {
  testId: number;
  name: string;
  dateOrdered: string;
  dateExpected: string;
  status: string;
}

export default function DashboardRecentTestBox() {
  const sampData: Test[] = [
    {
      testId: 1,
      name: "Urinalysis",
      dateOrdered: "02/14/25",
      dateExpected: "02/16/25",
      status: "Pending",
    },
  ];

  const [testData, setTestData] = useState<Test>();

  useEffect(() => {
    setTestData(sampData[0]);
  }, []);

  // Progress Bar
  const statusToStep = {
    "Pending": 1,
    "In Progress": 2,
    "Complete": 3,
  };
  
  const step = statusToStep[testData?.status as keyof typeof statusToStep] || 1;

  return (
    <div className="w-[544px] h-[266px] bg-white rounded-[10px] border border-[#e5e5e5] p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div style= {{ color: "#4c4c4c", fontWeight: "500", fontSize: "20px" }} className="text-lg">Recent Test</div>
      </div>

      {/* Test Name */}
      <div style={{ fontSize: "17px"}} className="flex gap-1 text-sm">
        <span style={{ color: "#4c4c4c", fontWeight: "bold" }}>Test:</span>
        <span style={{ color: "#4c4c4c"}}>{testData?.name}</span>
      </div>

      {/* Dates */}
      <div style={{fontSize: "17px", color: "#4c4c4c"}} className="flex items-center gap-2 text-sm">
        <span>Date Ordered: {testData?.dateOrdered}</span>
        <div className="w-[1px] h-4 bg-gray-300" />
        <span>Expected by: {testData?.dateExpected}</span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-sm italic text-gray-500 mt-1">
        <div className="w-4 h-4 bg-yellow-300 rounded-full" />
        <span style={{ fontSize: "17px" }}>Status: {testData?.status}</span>
      </div>

      <ProgressBar step={step} style={{ marginLeft: 49, marginTop: "32px", marginBottom: "49px"}} />

    </div>
  );
}
