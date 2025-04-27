import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("users")
    .select("id, userType, firstName, lastName, birthdate, gender, phoneNumber, email, contactPreference, address, username, profilePic")
    .eq("id", userId)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json(data);
}
