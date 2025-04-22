export async function getAppointments(petId: string) {
   const res = await fetch(`/api/appointments?petId=${petId}`);
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to fetch appointments");
   return data;
 }
 
 export async function createAppointment(payload: any) {
   const res = await fetch(`/api/appointments`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(payload),
   });
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to create appointment");
   return data;
 }