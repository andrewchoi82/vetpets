import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('users')
    .select('id, username')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const cookie = serialize('userSession', JSON.stringify({ id: data.id, username: data.username }), {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  const response = NextResponse.json({ success: true, userId: data.id });
  response.headers.set('Set-Cookie', cookie);
  return response;
}
