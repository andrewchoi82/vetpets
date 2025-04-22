"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import { getTests } from "@/app/lib/api/tests"; // adjust path if needed

interface Test {
  testId: number;
  userId: number;
  name: string;
  dateOrdered: string;
  dateExpected: string;
  status: string;
  result: string;
}


export default function DashboardRecentTestBox() {
  const [testData, setTestData] = useState<Test | null>(null);

  useEffect(() => {
    const fetchTest = async () => {
      try {
        const data = await getTests("1"); // hardcoded petId for now
        if (Array.isArray(data) && data.length > 0) {
          setTestData(data[0]); // show the most recent
        }
      } catch (err) {
        console.error("Failed to fetch test data", err);
      }
    };

    fetchTest();
  }, []);

  const statusToStep = {
    Pending: 1,
    "In Progress": 2,
    Complete: 3,
  };

  const step = statusToStep[testData?.status as keyof typeof statusToStep] || 1;

  const formatShortDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    });
  };  

  return (
    <div className="w-[544px] h-[266px] bg-white rounded-[10px] border border-[#e5e5e5] p-4 flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div style={{ color: "#4c4c4c", fontWeight: "500", fontSize: "20px" }}>
          Recent Test
        </div>
      </div>

      {testData && (
        <>
          <div style={{ fontSize: "17px" }} className="flex gap-1 text-sm">
            <span style={{ color: "#4c4c4c", fontWeight: "bold" }}>Test:</span>
            <span style={{ color: "#4c4c4c" }}>{testData.name}</span>
          </div>

          <div
            style={{ fontSize: "17px", color: "#4c4c4c" }}
            className="flex items-center gap-2 text-sm"
          >
            <span style={{ color: "#919191" }}>
              Date Ordered: {formatShortDate(testData.dateOrdered)}
            </span>
            <div className="w-[1px] h-4 bg-gray-300" />
            <span style={{ color: "#919191" }}>
              Expected by: {formatShortDate(testData.dateExpected)}
            </span>

          </div>

          <div className="flex items-center gap-2 text-sm italic text-gray-500 mt-1">
            <div className="w-4 h-4 bg-yellow-300 rounded-full" />
            <span style={{ fontSize: "17px" }}>
              Status: {testData.status}
            </span>
          </div>

          <ProgressBar
            step={step}
            style={{ marginLeft: 49, marginTop: "32px", marginBottom: "49px" }}
          />
        </>
      )}
    </div>
  );
}
