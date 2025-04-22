export async function getAllPets() {
   const res = await fetch(`/api/pets`);
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to fetch pets");
   return data;
 }
 
 export async function getPetById(id: string) {
   const res = await fetch(`/api/pets/${id}`);
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to fetch pet");
   return data;
 }
 
 export async function createPet(data: any) {
   const res = await fetch(`/api/pets`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(data),
   });
   const result = await res.json();
   if (!res.ok) throw new Error(result.error || "Failed to create pet");
   return result;
 }