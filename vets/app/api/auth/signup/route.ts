import { supabase } from "@/app/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { setMaxIdleHTTPParsers } from "node:http";

export async function POST(req: NextRequest) {
  const {
    email,
    password,
    username,
    userType = 1,
    firstName,
    lastName,
    birthdate,
    phoneNumber,
    address,
    sex,
  } = await req.json();

  // ✅ Validate required fields
  if (!email || !password || !username || !firstName || !lastName || !birthdate || !phoneNumber || !address || !sex) {
    return NextResponse.json(
      { success: false, error: "Missing required fields" },
      { status: 400 }
    );
  }

  // ✅ Check if the email already exists
  const { data: existingUser } = await supabase
    .from("users")
    .select("id")
    .eq("email", email)
    .single();

  if (existingUser) {
    return NextResponse.json(
      { success: false, error: "Email already in use" },
      { status: 409 }
    );
  }

  // ✅ Hash the password securely
  const hashedPassword = await bcrypt.hash(password, 10);

  // ✅ Insert the new user with the new fields
  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        email,
        password: hashedPassword,
        username,
        userType,
        firstName,
        lastName,
        birthdate,         // Should be sent as "YYYY-MM-DD"
        phoneNumber,
        address,
        sex: sex,        
      },
    ])
    .select();

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }

  if (!data || data.length === 0) {
    return NextResponse.json(
      { success: false, error: "User creation failed" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: true, message: "User created successfully" },
    { status: 201 }
  );
}
