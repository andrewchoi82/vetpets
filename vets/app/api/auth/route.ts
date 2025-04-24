import { cookies } from 'next/headers';
import { verifyJWT } from "../../lib/jwt";  

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
