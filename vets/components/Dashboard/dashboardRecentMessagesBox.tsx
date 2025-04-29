"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { getConversations } from "@/app/lib/api/conversations";
import Cookies from 'js-cookie';
import { useRouter } from "next/navigation";

export default function DashboardRecentMessagesBox() {
  const router = useRouter();

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
  const [isLoading, setIsLoading] = useState(true);
  const petId = Cookies.get('petId');

  useEffect(() => {
    const fetchConvos = async () => {
      try {
        setIsLoading(true);
        const data = await getConversations(Number(petId));
        setMessageData(data);
      } catch (err) {
        console.error("Failed to fetch conversations");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConvos();
  }, []);

  
  const handleMessageAction = () => {
    router.push('/client/message');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;
  };

  return (
    <div className="w-full h-full bg-white rounded-[10px] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center  p-3">
        <div style={{ color: "#4c4c4c", fontWeight: "500", fontSize: "20px" }} className="text-lg">
          Recent Messages
        </div>
      </div>

      {/* Messages */}
      <div className={`px-2 text-[17px] overflow-y-scroll flex-1 ${messageData.length === 0 && !isLoading ? 'bg-[#f4f4f4]' : ''}`} style={{ scrollbarWidth: "none" }}>
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            Loading...
          </div>
        ) : messageData.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 bg-[#f4f4f4]">
            No recent messages
            <button
                style={{
                  fontSize: "15px",
                  backgroundColor: "#004d81",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "5px",
                  border: "none",
                  cursor: "pointer",
                  marginTop: "15px",
                }}
                onClick={handleMessageAction}
              >
                Message
              </button>
          </div>
        ) : (
          messageData.map((message, index) => (
            <div key={message.convoId} className="flex justify-between items-center py-2 p-2 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-[6px] flex items-center justify-center">
                  <Image
                    src={
                      index % 4 === 0
                        ? "/img/dashboard/compLabIcon.svg"
                        : index % 4 === 1
                        ? "/img/dashboard/compApprovedIcon.svg"
                        : index % 4 === 2
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
                {formatDate(message.recentDate)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
