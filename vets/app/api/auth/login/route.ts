import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';
import bcrypt from 'bcrypt';
import { createJWT } from '@/app/lib/jwt';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  const { data: user, error } = await supabase
    .from('users')
    .select('id, username, password_hash, userType')
    .eq('email', email)
    .single();

  if (error || !user) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const passwordMatch = await bcrypt.compare(password, user.password_hash);
  if (!passwordMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = createJWT({ userId: user.id, userType: user.userType });

  const cookie = serialize('token', token, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 2, // 2 hours (or however long you want)
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  const response = NextResponse.json({ success: true, userId: user.id });
  response.headers.set('Set-Cookie', cookie);
  return response;
}
