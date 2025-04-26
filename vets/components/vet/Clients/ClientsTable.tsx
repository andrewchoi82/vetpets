"use client";
import React, { useState, useEffect } from "react";
import { getPetsByDoctorId, getUserById } from "@/app/lib/api/users";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface ClientTableProps {
  selected: string,
  setSelected: Function
}

export default function ClientsTable({selected, setSelected} : ClientTableProps) {
  type Pet = {
    name: string;
    petId: number;
    users: {
      lastName: string;
      firstName: string;
    }
  };
  
  interface Client {
    sex: string;
    email: string;
    address: string;
    lastName: string;
    userType: number;
    username: string;
    birthdate: string;
    firstName: string;
    profilePic: string;
    phoneNumber: number;
    contactPreference: string;
    userId: string;
    numOfPets: number;
  }
  const [vetClientData, setVetClientData] = useState<Client[]>([]);
  const [vetPetData, setVetPetData] = useState<Pet[]>([]);
  const currId = Cookies.get('userId');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res1 = await fetch(`/api/users/byDoctor?doctorId=${currId}`, {
          method: 'GET',
      });
      const users = await res1.json();
      setVetClientData(users);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleRowClick = (userId: string) => {
    router.push(`/vet/users/${userId}`);
  };
  
  return (
   <>
     {vetPetData && (
       <div style={{ width: "100%" }}>
         <table style={{ width: "100%", borderCollapse: "collapse" }}>
           <thead>
             <tr style={{ borderBottom: "1px solid #d1d5db" }}>
               <th style={{ ...baseThStyle, paddingLeft: 40, width: "170px" }}>Last name</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "170px" }}>First name</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "170px" }}>Number of pets</th>
               <th style={{ ...baseThStyle, paddingLeft: 24, width: "120px" }}></th>
             </tr>
           </thead>
           <tbody>
             {vetClientData.map((client, index) => (
               <tr 
                 key={client.userId || index} 
                 style={{ 
                   height: "64px", 
                   borderBottom: "1px solid #e5e5e5",
                   cursor: "pointer"
                 }}
                 onClick={() => handleRowClick(client.userId)}
               >
                 <td style={{ paddingLeft: 40, color: "#111827" }}>{client.lastName}</td>
                 <td style={{ paddingLeft: 24, color: "#111827" }}>{client.firstName}</td>
                 <td style={{ paddingLeft: 24, color: "#111827" }}>{client.numOfPets}</td>
                 <td style={{ paddingLeft: 24 }}>
                   <button
                     onClick={(e) => {
                       e.stopPropagation();
                       router.push(`/vet/users/${client.userId}/pets`);
                     }}
                     style={{
                       backgroundColor: "#004d81",
                       color: "white",
                       padding: "6px 12px",
                       borderRadius: "4px",
                       border: "none",
                       cursor: "pointer",
                       fontSize: "14px"
                     }}
                   >
                     See Pet Details
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
