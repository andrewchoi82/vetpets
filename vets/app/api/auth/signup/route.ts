import { supabase } from "@/app/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { email, password, username, userType = 1 } = await req.json();

  if (!email || !password || !username) {
    return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  // Check if email already exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    return NextResponse.json({ success: false, error: "Email already in use" }, { status: 409 });
  }

  // Hash the password before storing
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert the new user
  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hashedPassword, username, userType }])
    .select();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ success: false, error: "User creation failed" }, { status: 500 });
  }

  return NextResponse.json({ success: true, message: "User created successfully" }, { status: 201 });
}
