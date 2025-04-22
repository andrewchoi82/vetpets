import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { createJWT } from '@/app/lib/jwt';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ success: false, error: 'Missing email or password' }, { status: 400 });
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('id, password, userType')  // ✅ Make sure you select password_hash here!
    .eq('email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);  // ✅ Use password_hash
  if (!isMatch) {
    return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
  }

  const token = createJWT({ userId: user.id, userType: user.userType });

  const cookie = serialize('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 2, // 2 hours
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  const response = NextResponse.json({ success: true, userId: user.id });
  response.headers.set('Set-Cookie', cookie);
  return response;
}
