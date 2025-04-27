"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

interface PetTableProps {
  selected: string,
  setSelected: Function,
  userId?: string // Make userId optional as it can come from props or URL params
}

export default function PetDetailTables({selected, setSelected, userId: propUserId} : PetTableProps) {
  interface Pet {
    petId: number;
    name: string;
    age: string;
    sex: string;
    weight: number;
    breed: string;
    sterilized: boolean;
  }
  
  const [petData, setPetData] = useState<Pet[]>([]);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        // Get userId from props, URL params, or from the selected state
        let userId = propUserId;
        
        if (!userId && params.id) {
          userId = params.id as string;
        }
        
        if (!userId && selected.includes('/')) {
          userId = selected.split('/').pop(); // Get userId from the URL in selected
        }
        
        console.log("Using userId:", userId);
        
        if (userId) {
          const res = await fetch(`/api/pets/petsByUser?userId=${userId}`, {
            method: 'GET',
          });
          const data = await res.json();
          setPetData(data);
        }
      } catch (error) {
        console.error("Error fetching pet data:", error);
      }
    };

    fetchPetData();
  }, [selected, propUserId, params]);

  const handleRowClick = (petId: number) => {
    // Get the current URL parts
    const pathParts = window.location.pathname.split('/');
    
    // Find the userId in the URL
    let userId = propUserId;
    
    if (!userId && params.id) {
      userId = params.id as string;
    }
    
    if (!userId && pathParts.length >= 2) {
      // Look for the userId in the URL parts
      for (let i = 0; i < pathParts.length; i++) {
        if (pathParts[i] === 'users' && i + 1 < pathParts.length) {
          userId = pathParts[i + 1];
          break;
        }
      }
    }
    
    if (userId) {
      // Navigate to the pet details page
      router.push(`/vet/users/${userId}/${petId}`);
    } else {
      console.error("UserId not found, cannot navigate to pet details");
    }
  };
  
  return (
    <div style={{ width: "100%" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ borderBottom: "1px solid #d1d5db" }}>
            <th style={{ ...baseThStyle, paddingLeft: 40, width: "150px" }}>Name</th>
            <th style={{ ...baseThStyle, paddingLeft: 24, width: "100px" }}>Pet ID</th>
            <th style={{ ...baseThStyle, paddingLeft: 24, width: "100px" }}>Age</th>
            <th style={{ ...baseThStyle, paddingLeft: 24, width: "100px" }}>Sex</th>
            <th style={{ ...baseThStyle, paddingLeft: 24, width: "100px" }}>Weight</th>
            <th style={{ ...baseThStyle, paddingLeft: 24, width: "150px" }}>Breed</th>
            <th style={{ ...baseThStyle, paddingLeft: 24, width: "100px" }}>Sterilized</th>
            <th style={{ ...baseThStyle, paddingLeft: 24, width: "120px" }}></th>
          </tr>
        </thead>
        <tbody>
          {petData.map((pet, index) => (
            <tr 
              key={pet.petId || index} 
              style={{ 
                height: "64px", 
                borderBottom: "1px solid #e5e5e5",
                cursor: "pointer"
              }}
              onClick={() => handleRowClick(pet.petId)}
            >
              <td style={{ paddingLeft: 40, color: "#111827" }}>{pet.name}</td>
              <td style={{ paddingLeft: 24, color: "#111827" }}>{pet.petId}</td>
              <td style={{ paddingLeft: 24, color: "#111827" }}>{pet.age}</td>
              <td style={{ paddingLeft: 24, color: "#111827" }}>{pet.sex}</td>
              <td style={{ paddingLeft: 24, color: "#111827" }}>{pet.weight}</td>
              <td style={{ paddingLeft: 24, color: "#111827" }}>{pet.breed}</td>
              <td style={{ paddingLeft: 24, color: "#111827" }}>{pet.sterilized ? "Yes" : "No"}</td>
              <td style={{ paddingLeft: 24 }}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRowClick(pet.petId);
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