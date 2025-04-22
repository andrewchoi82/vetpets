import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ userId: -1 }, { status: 400 });
  }

  // Fetch user by email
  const { data: user, error } = await supabase
    .from('users')
    .select('id, password')
    .eq('email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ userId: -1 }, { status: 401 });
  }

  // Compare password with hash
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ userId: -1 }, { status: 401 });
  }

  // Return userId if valid
  return NextResponse.json({ userId: user.id }, { status: 200 });
}
