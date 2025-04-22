export async function getUserById(id: string) {
   const res = await fetch(`/api/users/${id}`);
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Failed to fetch user");
   return data;
 }

export async function getAllClients() {
  const res = await fetch(`/api/users?userType=1`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch vets");
  return data;
}
 
export async function getAllVets() {
  const res = await fetch(`/api/users?userType=2`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch vets");
  return data;
}

export async function getPetsByDoctor(doctorId: string) {
  const res = await fetch(`/api/pets/petsByDoctor?doctorId=${doctorId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch pets");
  return data;
}

export async function getPetsByDoctorId(doctorId: string) {
  const res = await fetch(`/api/pets/petsByDoctor?doctorId=${doctorId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch pets for doctor");
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
