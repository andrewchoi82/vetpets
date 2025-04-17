export async function getUserById(id: string) {
   const res = await fetch(`/api/users/${id}`);
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to fetch user");
   return data;
 }
 
 export async function updateUser(id: string, updates: any) {
   const res = await fetch(`/api/users/${id}`, {
     method: "PUT",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(updates),
   });
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to update user");
   return data;
 }
 