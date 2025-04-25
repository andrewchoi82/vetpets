import { getUserFromToken } from "../auth/route";
import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";

export async function GET() {
  const session = await getUserFromToken();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("users")
    .select("id, userType, firstName, lastName, birthdate, gender, phoneNumber, email, contactPreference, address, username, profilePic")
    .eq("id", session.userId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
