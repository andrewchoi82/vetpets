"use client";
import Image from "next/image";
import React, { useEffect, useState, KeyboardEvent } from 'react'

import { SideBarContainer } from "@/components/SideBarContainer";
import DashboardRecentTestBox from "@/components/dashboardRecentTestBox"
import DashboardBillingBox from "@/components/dashboardBillingBox"
import DashboardMessagesBox from "@/components/dashboardMessagesBox"
import DashboardAppointmentsBox from "@/components/dashboardAppointmentsBox"
import DashboardSmallBox from "@/components/dashboardSmallBox"


export default function MessageTexting() {
   interface Message {
      messageId: number; // unique ID
      chatId: number; // which conversation this belongs to
      senderId: number;
      receiverId: number;
      type: "text" | "image" | "file";
      content: string; // actual message (text OR file URL)
      fileName?: string; // for files/images
      fileType?: string; // e.g., 'image/png', 'application/pdf'
      createdAt: string;
   };

   const [allMessages, setAllMessages] = useState<Message[]>([]);
   const [sendingMessage, setSendingMessage] = useState("");
   const [pendingFiles, setPendingFiles] = useState<File[]>([]);
   const [pendingImages, setPendingImages] = useState<File[]>([]);

   const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setPendingFiles(prev => [...prev, ...Array.from(e.target.files || [])]);
      }
   };

   const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setPendingImages(prev => [...prev, ...Array.from(e.target.files || [])]);
      }
   };

   const handleSubmit = () => {
      const newMessages: Message[] = [];
      const lastId = allMessages.length > 0 ? Math.max(...allMessages.map(m => m.messageId)) : 0;
      let currentId = lastId + 1;

      // Add text message if exists
      if (sendingMessage.trim()) {
         newMessages.push({
            messageId: currentId++,
            chatId: 1,
            senderId: 1,
            receiverId: 2,
            type: "text",
            content: sendingMessage,
            fileName: "",
            fileType: "",
            createdAt: new Date().toISOString()
         });
      }

      // Add image messages
      pendingImages.forEach(image => {
         newMessages.push({
            messageId: currentId++,
            chatId: 1,
            senderId: 1,
            receiverId: 2,
            type: "image",
            content: "",
            fileName: `/img/message/${image.name}`, // Store with proper path
            fileType: image.type,
            createdAt: new Date().toISOString()
         });
      });

      // Add file messages
      pendingFiles.forEach(file => {
         newMessages.push({
            messageId: currentId++,
            chatId: 1,
            senderId: 1,
            receiverId: 2,
            type: "file",
            content: "",
            fileName: file.name,
            fileType: file.type,
            createdAt: new Date().toISOString()
         });
      });

      // Update state with user messages
      setAllMessages(prev => [...prev, ...newMessages]);

      // Add random response from randomData after 2 seconds
      if (newMessages.length > 0) {
         setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * randomData.length);
            const randomResponse = {
               ...randomData[randomIndex],
               messageId: currentId + 1
            };
            setAllMessages(prev => [...prev, randomResponse]);
         }, 2000);
      }

      setSendingMessage("");
      setPendingFiles([]);
      setPendingImages([]);
   };

   const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
         e.preventDefault();
         handleSubmit();
      }
   };

   const sampData: Message[] = [
      {
         messageId: 1,
         chatId: 1,
         senderId: 1,
         receiverId: 2,
         type: "text", 
         content: "I've noticed some concerning symptoms with Snowball that might indicate an ear infection. He has been scratching his ear frequently, shaking his head, and there's a noticeable odor coming from the ear. Please let me know what you recommend.",
         fileName: "",
         fileType: "",
         createdAt: "2025-04-01T05:38:15"
      },
      {
         messageId: 2,
         chatId: 1,
         senderId: 2,
         receiverId: 1,
         type: "text", 
         content: "Type Shit",
         fileName: "",
         fileType: "",
         createdAt: "2025-04-01T05:38:15"
      },
      {
         messageId: 3,
         chatId: 1,
         senderId: 1,
         receiverId: 2,
         type: "text", 
         content: "I think my dog is dead",
         fileName: "",
         fileType: "",
         createdAt: "2025-04-01T05:38:15"
      },
      {
         messageId: 4,
         chatId: 1,
         senderId: 1,
         receiverId: 2,
         type: "image", 
         content: "",
         fileName: "/img/message/bear.png",
         fileType: ".png",
         createdAt: "2025-04-01T05:38:15"
      },
      {
         messageId: 5, // Changed from 4 to 5 to ensure unique IDs
         chatId: 1,
         senderId: 2,
         receiverId: 1,
         type: "text", 
         content: "TYPEE SHIIIITTTT",
         fileName: "",
         fileType: "",
         createdAt: "2025-04-01T05:38:15"
      }
   ];

   const randomData: Message[] = [
      {
         messageId: 7,
         chatId: 1,
         senderId: 2,
         receiverId: 1,
         type: "text", 
         content: "Based on the symptoms you described, it's possible that Snowball has an ear infection or irritation. I recommend bringing them in for an exam so we can properly assess the ear and determine if medication is needed.",
         fileName: "",
         fileType: "",
         createdAt: "2025-04-01T05:38:15"
      },
      {
         messageId: 8,
         chatId: 1,
         senderId: 2,
         receiverId: 1,
         type: "text", 
         content: "Type Shit",
         fileName: "",
         fileType: "",
         createdAt: "2025-04-01T05:38:15"
      },
      {
         messageId: 9,
         chatId: 1,
         senderId: 2,
         receiverId: 1,
         type: "text", 
         content: "No",
         fileName: "",
         fileType: "",
         createdAt: "2025-04-01T05:38:15"
      },
      {
         messageId: 10,
         chatId: 1,
         senderId: 2,
         receiverId: 1,
         type: "text", 
         content: "Can you explain the situation in more detail?",
         fileName: "",
         fileType: "",
         createdAt: "2025-04-01T05:38:15"
      },
      {
         messageId: 11,
         chatId: 1,
         senderId: 2,
         receiverId: 1,
         type: "text", 
         content: "Let me ask CHATGPT. Please be on hold for 2 minutes",
         fileName: "",
         fileType: "",
         createdAt: "2025-04-01T05:38:15"
      },
   ];

   useEffect(() => {
      setAllMessages(sampData);
   }, []);

   return (
      <main className="fixed max-w-[1300px] w-[1300px] h-[82vh] bg-[#F7F7F7] left-[250px] 2xl:left-[350px] top-[13.6vh] rounded-[40px] p-[30px] mr-[10px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] flex flex-col">
         {/* Contact namecard */}
         <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-white p-3 rounded-lg shadow">
            <div className="w-14 h-12 bg-gray-200 rounded-lg">
               <Image 
                  src="/img/message/sarah.svg"
                  alt="Dr. Sarah Davis"
                  width={48}
                  height={48}
                  className="rounded-lg object-cover"
               />
            </div>
            <div>
               <h3 className="font-semibold text-lg">Dr. Sarah Davis</h3>
               <p className="text-gray-600 text-sm">Veterinarian</p>
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-3">
            <div className="flex flex-col gap-4">
               {allMessages.map((message, index) => (
                  <div 
                     key={`${message.messageId}-${index}`}
                     className={`flex ${message.senderId === 1 ? 'justify-end' : 'justify-start'}`}
                  >
                     <div 
                        className={`max-w-[70%] rounded-lg p-3 ${
                           message.senderId === 1 
                              ? message.type === 'text' ? 'bg-[#004D81] text-white' : ''
                              : message.type === 'text' ? 'bg-[#919191] text-white' : ''
                        }`}
                     >
                        {message.type === 'text' && (
                           <p className="break-words">{message.content}</p>
                        )}
                        {message.type === 'image' && (
                           <div className={`${message.senderId === 1 ? 'flex justify-end' : ''}`}>
                              <Image
                                 src={message.fileName || ""}
                                 alt="Message image"
                                 width={300}
                                 height={200}
                                 className="rounded-lg"
                              />
                           </div>
                        )}
                        {message.type === 'file' && (
                           <div className="flex items-center gap-2">
                              <Image
                                 src="/img/message/messageAttach.svg"
                                 alt="File attachment"
                                 width={20}
                                 height={20}
                              />
                              <span>{message.fileName}</span>
                           </div>
                        )}
                     </div>
                  </div>
               ))}
            </div>
         </div>

         <div className="mt-auto pt-2">
            {/* Preview area for pending files/images */}
            {(pendingImages.length > 0 || pendingFiles.length > 0) && (
               <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg mb-2">
                  {pendingImages.map((img, idx) => (
                     <div key={idx} className="relative w-16 h-16">
                        <Image
                           src={URL.createObjectURL(img)}
                           alt="Preview"
                           fill
                           className="object-cover rounded"
                        />
                     </div>
                  ))}
                  {pendingFiles.map((file, idx) => (
                     <div key={idx} className="flex items-center gap-1 bg-white p-1 rounded">
                        <Image
                           src="/img/message/messageAttach.svg"
                           alt="File"
                           width={16}
                           height={16}
                        />
                        <span className="text-sm truncate max-w-[100px]">{file.name}</span>
                     </div>
                  ))}
               </div>
            )}

            <div className="flex items-center gap-2 bg-white rounded-lg p-2 shadow">
               <input
                  type="text"
                  value={sendingMessage}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSendingMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="flex-1 border-none outline-none px-3 py-2"
               />
               
               <div className="relative">
                  <input
                     type="file"
                     accept="image/*"
                     onChange={handleChangeImage}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     multiple
                  />
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer hover:bg-gray-50">
                     <Image
                        src="/img/message/messageImage.svg"
                        alt="Add image"
                        width={20}
                        height={20}
                     />
                  </div>
               </div>
               <div className="relative">
                  <input
                     type="file"
                     accept="image/*,
                        video/*,
                        audio/*,
                        application/pdf,
                        application/msword,
                        application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                        application/vnd.ms-excel,
                        application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
                        text/plain,
                        application/zip,
                        application/json
                     "
                     onChange={handleChangeFile}
                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                     multiple
                  />
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer hover:bg-gray-50">
                     <Image
                        src="/img/message/messageAttach.svg"
                        alt="Add file"
                        width={20}
                        height={20}
                     />
                  </div>
               </div>
               <div className="relative">
                  <div 
                     className="flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer hover:bg-gray-50"
                     onClick={handleSubmit}
                  >
                     <Image
                        src="/img/message/messageSend.svg"
                        alt="Send message"
                        width={20}
                        height={20}
                     />
                  </div>
               </div>
            </div>
         </div>
      </main>
   );
}