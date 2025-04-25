import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { verifyJWT } from '@/app/lib/jwt';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { params } = context;

  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized: Invalid or expired token' }, { status: 401 });
  }

  if (decoded.userId !== parseInt(params.id)) {
    return NextResponse.json({ error: 'Forbidden: ID mismatch' }, { status: 403 });
  }

  const { data, error } = await supabase
    .from('users')
    .select('id, username, userType')
    .eq('id', params.id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
