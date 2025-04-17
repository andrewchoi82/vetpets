"use client";
import React, { useState, useEffect } from "react";
import { getPetsByDoctorId, getUserById } from "@/app/lib/api/users";

interface ClientTableProps {
  selected: string,
  setSelected: Function
}

export default function ClientsTable({selected, setSelected} : ClientTableProps) {
  type Pet = {
    lastName: string;
    firstName: string;
    name: string;
    petId: number;
  };

  const [vetPetData, setVetPetData] = useState<Pet[]>([]);
  
  useEffect(() => {
    const fetchPets = async (id: string) => {
      try {
        const data = await getPetsByDoctorId("6");
        setVetPetData(data);

      } catch (error) {
        console.error("Failed to fetch doctor.");
      }
    };

    fetchPets("6");
  
  }, []);

  
  return (
   <>
     {vetPetData && (
       <div style={{ width: "100%" }}>
         <table style={{ width: "100%", borderCollapse: "collapse" }}>
           <thead>
             <tr style={{ borderBottom: "1px solid #d1d5db" }}>
               <th style={{ ...baseThStyle, paddingLeft: 40, width: "170px" }}>Last name</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "170px" }}>First name</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "170px" }}>Pet name</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "170px" }}>Pet ID</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "120px" }}></th>
             </tr>
           </thead>
           <tbody>
             {vetPetData.map(({lastName, firstName, name, petId}, index) => (
               <tr key={index} style={{ height: "64px", borderBottom: "1px solid #e5e5e5" }}>
                 <td style={{ paddingLeft: 40, color: "#111827" }}>{lastName}</td>
                 <td style={{ paddingLeft: 24, color: "#111827" }}>{firstName}</td>
                 <td style={{ paddingLeft: 24, color: "#111827" }}>{name}</td>
                 <td style={{ paddingLeft: 24, color: "#111827" }}>{petId}</td>
                 <td style={{ paddingLeft: 24 }}>
                   <button
                     style={{
                       display: "flex",
                       alignItems: "center",
                       gap: "6px",
                       border: "none",
                       background: "transparent",
                       color: "#374151",
                       cursor: "pointer",
                       padding: 0,
                     }}
                     onClick={() => alert("Details clicked")}
                   >
                     <img
                       src="/img/health-records/details-icon.svg"
                       alt="Details Icon"
                       style={{ width: "17px", height: "17px" }}
                     />
                     <span style={{ textDecoration: "underline", marginLeft: "17px", fontSize: 17 }}>Details</span>
                   </button>
                 </td>
               </tr>
             ))}
           </tbody>
         </table>
       </div>
     )}
   </>
 );

 
}

const baseThStyle = {
  paddingTop: "20px",
  paddingBottom: "8px",
  fontSize: "17px",
  fontWeight: 500,
  color: "#6B7280",
  textAlign: "left" as const,
};
