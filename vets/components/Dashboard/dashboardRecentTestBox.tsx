"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

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

  return (
    <div className="w-[524px] bg-white rounded-[10px] border border-[#e5e5e5] p-4 flex flex-col gap-3">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-900">Recent Test</div>
        <div className="text-gray-400 text-xl">{">"}</div>
      </div>

      {/* Test Name */}
      <div className="flex gap-1 text-sm text-gray-900">
        <span className="font-medium">Test:</span>
        <span>{testData?.name}</span>
      </div>

      {/* Dates */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Date Ordered: {testData?.dateOrdered}</span>
        <div className="w-[1px] h-4 bg-gray-300" />
        <span>Expected by: {testData?.dateExpected}</span>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2 text-sm italic text-gray-500 mt-1">
        <div className="w-4 h-4 bg-yellow-300 rounded-full" />
        <span>Status: {testData?.status}</span>
      </div>

      {/* Progress bar */}
      <div style={{marginLeft: "20px", marginTop: "20px"}}>
        <div className="flex items-center mt-2 w-full gap-0">
            {/* Step 1 */}
            <div className="flex items-center gap-0">
                <div className="w-4 h-4 bg-blue-900 rounded-full" />
                <div className="w-[100px] h-[2px] bg-blue-900" />
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-0">
                <div className="w-4 h-4 bg-gray-300 rounded-full" />
                <div className="w-[100px] h-[2px] bg-gray-200" />
            </div>

            {/* Step 3 */}
            <div className="w-4 h-4 bg-gray-200 rounded-full" />
        </div>
     </div>
    </div>
  );
}
