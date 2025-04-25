import { NextResponse } from 'next/server';
import { serialize } from 'cookie';

export async function POST() {
  const cookie = serialize('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,                        // ✅ Expire immediately
    sameSite: 'lax',                  // ✅ Prevent CSRF issues
    secure: process.env.NODE_ENV === 'production',  // ✅ Secure in production only
  });

  const response = NextResponse.json({ success: true });
  response.headers.set('Set-Cookie', cookie);
  return response;
}
