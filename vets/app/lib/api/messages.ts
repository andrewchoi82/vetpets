export async function getMessages(petId: string) {
   const res = await fetch(`/api/messages?petId=${petId}`);
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to fetch messages");
   return data;
 }
 
 export async function sendMessage(message: any) {
   const res = await fetch(`/api/messages`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(message),
   });
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to send message");
   return data;
 }