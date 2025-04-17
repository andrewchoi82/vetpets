import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const convoId = searchParams.get('convoId');
  if (!convoId) return NextResponse.json({ error: 'convoId is required' }, { status: 400 });
  const { data, error } = await supabase.from('message').select('*').eq('convoId', convoId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const message = await req.json();
  const { data, error } = await supabase.from('message').insert(message).select('messageId').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ messageId: data.messageId }, { status: 201 });
}