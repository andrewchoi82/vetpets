import { cookies } from 'next/headers';
import { verifyJWT } from "../../lib/jwt"; 

export async function login(credentials: { email: string; password: string }) {
   const res = await fetch(`/api/auth/login`, {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify(credentials),
   });
   const data = await res.json();
   if (!res.ok) throw new Error(data.error || "Login failed");
   return data;
 }
 
export async function getUserFromToken() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = await verifyJWT(token);
    return decoded;
  } catch {
    return null;
  }
}
