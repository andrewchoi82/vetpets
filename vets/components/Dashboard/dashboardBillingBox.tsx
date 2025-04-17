"use client";
import React, { useEffect, useState } from "react";
import { getBillings } from "@/app/lib/api/billings"; // make sure the path is correct

interface Billing {
  billingId: number;
  name: string;
  date: string;
  cost: number;
}

export default function DashboardBillingBox() {
  const [billingData, setBillingData] = useState<Billing[]>([]);

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        const data = await getBillings("1"); // Hardcoded petId for now
        setBillingData(data);
      } catch (error) {
        console.error("Failed to fetch billing data");
      }
    };

    fetchBilling();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;    
  };
  

  return (
    <div className="w-[580px] h-[266px] bg-white rounded-[10px] border border-[#e5e5e5] p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div
          style={{
            color: "#4c4c4c",
            fontWeight: "500",
            fontSize: "20px",
          }}
        >
          Billing
        </div>
      </div>

      <div
        className="flex flex-col divide-y divide-gray-200 text-[17px] text-[#4c4c4c] overflow-y-auto max-h-[180px] hide-scroll"
      >
        {billingData.map((billing) => (
          <div
            key={billing.billingId}
            className="flex justify-between items-center py-2"
          >
            <div className="flex gap-6">
              <span style={{marginRight: 20}} className="w-[70px]">{formatDate(billing.date)}</span>
              <span>{billing.name}</span>
            </div>
            <div>${billing.cost.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
