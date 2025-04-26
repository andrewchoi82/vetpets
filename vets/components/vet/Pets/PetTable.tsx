"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

interface PetTableProps {
  selected: string,
  setSelected: Function
}

export default function PetTable({selected, setSelected} : PetTableProps) {
  interface Pet {
    petId: number;
    name: string;
    age: string;
    gender: string;
    weight: number;
    breed: string;
    sterilized: boolean;
  }
  
  const [petData, setPetData] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRowClick = (petId: number) => {
    router.push(`/vet/pets/${petId}`);
  };

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        setLoading(true);
        setError(null);
        const userId = selected.split('/').pop(); // Get userId from the URL
        if (userId) {
          const res = await fetch(`/api/pets/petsByUser?userId=${userId}`, {
            method: 'GET',
          });
          const data = await res.json();
          if (Array.isArray(data)) {
            setPetData(data);
          } else {
            setPetData([]);
            setError("Invalid data format received");
          }
        }
      } catch (error) {
        console.error("Error fetching pet data:", error);
        setError("Failed to fetch pet data");
        setPetData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPetData();
  }, [selected]);
  
  return (
    <div style={{ width: "100%" }}>
      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
      ) : error ? (
        <div style={{ textAlign: "center", padding: "20px", color: "red" }}>{error}</div>
      ) : petData.length === 0 ? (
        <div style={{ textAlign: "center", padding: "20px" }}>No pets found</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #d1d5db" }}>
              <th style={{ ...baseThStyle, paddingLeft: 40, width: "150px" }}>Name</th>
              <th style={{ ...baseThStyle, paddingLeft: 24, width: "100px" }}>Pet ID</th>
              <th style={{ ...baseThStyle, paddingLeft: 24, width: "100px" }}>Age</th>
              <th style={{ ...baseThStyle, paddingLeft: 24, width: "100px" }}>Gender</th>
              <th style={{ ...baseThStyle, paddingLeft: 24, width: "100px" }}>Weight</th>
              <th style={{ ...baseThStyle, paddingLeft: 24, width: "150px" }}>Breed</th>
              <th style={{ ...baseThStyle, paddingLeft: 24, width: "100px" }}>Sterilized</th>
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
                <td style={{ paddingLeft: 24, color: "#111827" }}>{pet.gender}</td>
                <td style={{ paddingLeft: 24, color: "#111827" }}>{pet.weight}</td>
                <td style={{ paddingLeft: 24, color: "#111827" }}>{pet.breed}</td>
                <td style={{ paddingLeft: 24, color: "#111827" }}>{pet.sterilized ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
