"use client";
import React, { useEffect, useState } from "react";

interface Billing {
  billingId: number;
  name: string;
  date: string;
  cost: number;
}

export default function DashboardBillingBox() {
  const sampData: Billing[] = [
    { billingId: 1, name: "Ear infection", date: "03/16/25", cost: 185.0 },
    { billingId: 2, name: "Vaccination", date: "03/14/25", cost: 50.0 },
    { billingId: 3, name: "Emergency Visit", date: "02/12/25", cost: 80.0 },
    { billingId: 4, name: "Annual Check-up", date: "01/05/24", cost: 185.0 },
    { billingId: 5, name: "Annual Check-up", date: "01/05/24", cost: 185.0 },
  ];

  const [billingData, setBillingData] = useState<Billing[]>([]);

  useEffect(() => {
    setBillingData(sampData);
  }, []);

  return (
    <div className="w-[550px] bg-white rounded-[10px] border border-[#e5e5e5] p-4 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <div className="text-lg font-semibold text-gray-800">Billing</div>
        <div className="text-gray-400 text-xl">{">"}</div>
      </div>

      <div className="flex flex-col divide-y divide-gray-200">
        {billingData.map((billing) => (
          <div
            key={billing.billingId}
            className="flex justify-between items-center py-2 text-sm text-gray-700"
          >
            <div className="flex gap-6">
              <span className="w-[70px]">{billing.date}</span>
              <span>{billing.name}</span>
            </div>
            <div className="text-gray-500">${billing.cost.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
