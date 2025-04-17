"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getConversations } from "@/app/lib/api/conversations";

export default function DashboardRecentMessagesBox() {
  interface Conversation {
    convoId: number;
    name: string;
    recentDate: string;
    recentTime: string;
    petId: number;
    doctorId: number;
    numUnreadMessages: number;
  }

  const [messageData, setMessageData] = useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConvos = async () => {
      try {
        const data = await getConversations(1);
        setMessageData(data);
      } catch (err) {
        console.error("Failed to fetch conversations");
      }
    };

    fetchConvos();
  }, []);

  const formatDateTime = (date: string, time: string) => {
    const d = new Date(`${date}T${time}`);
    const dateStr = d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const timeStr = d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    return `${dateStr}\n${timeStr}`;
  };

  return (
    <div className="w-[544px] h-[300px] bg-white rounded-[10px] border border-[#e5e5e5] p-4 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div style={{ color: "#4c4c4c", fontWeight: "500", fontSize: "20px" }} className="text-lg">
          Recent Messages
        </div>
      </div>

      {/* Messages */}
      <div className="divide-y divide-gray-200 text-[17px] overflow-y-scroll" style={{ scrollbarWidth: "none" }}>
        {messageData.map((message, index) => (
          <div key={message.convoId} className="flex justify-between items-center py-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-[6px] flex items-center justify-center">
                <Image
                  src={
                    index === 0
                      ? "/img/dashboard/compLabIcon.svg"
                      : index === 1
                      ? "/img/dashboard/compApprovedIcon.svg"
                      : index === 2
                      ? "/img/dashboard/compVaccineIcon.svg"
                      : "/img/dashboard/compTestIcon.svg"
                  }
                  alt="icon"
                  width={30}
                  height={30}
                />
              </div>
              <div style={{ color: "#4c4c4c" }}>{message.name}</div>
            </div>
            <div style={{ color: "#4c4c4c", whiteSpace: "pre-line", textAlign: "right" }}>
              {formatDateTime(message.recentDate, message.recentTime)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
