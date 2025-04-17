
export async function getConversations(petId: number) {
  const res = await fetch(`/api/conversations?petId=${petId}`);
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to fetch conversations");
  return data;
}

 
export async function startConversation(payload: any) {
  const res = await fetch(`/api/conversations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to start conversation");
  return data;
}
