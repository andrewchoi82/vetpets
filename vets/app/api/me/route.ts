import { supabase } from "@/app/lib/supabaseClient";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: "userId parameter is required" }, { status: 400 });
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, userType, firstName, lastName, birthdate, sex, phoneNumber, email, contactPreference, address, username, profilePic")
      .eq("id", userId)
      .single();

    if (error || !data) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Error fetching user data" }, { status: 500 });
  }
}
