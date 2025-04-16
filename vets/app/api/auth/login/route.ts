import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
  }
  const { data, error } = await supabase.from('users').select('id').eq('email', email).eq('password', password).single();
  if (error || !data) return NextResponse.json({ userId: -1 });
  return NextResponse.json({ userId: data.id });
}
