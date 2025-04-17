export async function getBillings(petId: string) {
   const res = await fetch(`/api/billings?petId=${petId}`);
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to fetch billing data");
   return data;
 }