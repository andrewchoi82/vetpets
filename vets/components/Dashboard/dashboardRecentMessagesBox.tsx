"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function DashboardRecentMessagesBox() {
  interface Message {
    messageId: number;
    name: string;
    date: string;
    type: string;
    bgColor: string;
  }

  const sampData: Message[] = [
    {
      messageId: 1,
      name: "Lab Results Question",
      date: "03/22/25",
      type: "/img/dashboard/compLabIcon.svg",
      bgColor: "bg-sky-100",
    },
    {
      messageId: 2,
      name: "Medication Effects",
      date: "11/22/24",
      type: "/img/dashboard/compApprovedIcon.svg",
      bgColor: "bg-pink-100",
    },
    {
      messageId: 3,
      name: "Urgent: Vaccine Due",
      date: "10/22/24",
      type: "/img/dashboard/compVaccineIcon.svg",
      bgColor: "bg-violet-200",
    },
    {
      messageId: 4,
      name: "New Test Ordered",
      date: "05/17/24",
      type: "/img/dashboard/compTestIcon.svg",
      bgColor: "bg-amber-200",
    },
  ];

  const [messageData, setMessageData] = useState<Message[]>([]);

  useEffect(() => {
    setMessageData(sampData);
  }, []);

  return (
    <div className="w-[544px] h-[300px] bg-white rounded-[10px] border border-[#e5e5e5] p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div style= {{ color: "#4c4c4c", fontWeight: "500", fontSize: "20px" }} className="text-lg">Recent Messages</div>
      </div>

      {/* Messages */}
      <div className="divide-y divide-gray-200 text-[17px]">
        {messageData.map((message) => (
          <div
            key={message.messageId}
            className="flex justify-between items-center py-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[6px] flex items-center justify-center">
                <Image src={message.type} alt="icon" width={30} height={30} />
              </div>
              <div style={{ color: "#4c4c4c" }}>{message.name}</div>
            </div>
            <div style={{ color: "#4c4c4c" }}>{message.date}</div>
          </div>
        ))}
      </div>


    </div>
  );
}
