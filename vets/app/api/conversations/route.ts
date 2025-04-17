import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const petId = searchParams.get('petId');
  if (!petId) return NextResponse.json({ error: 'petId is required' }, { status: 400 });
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('petId', petId)
    .order('recentDate', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const convo = await req.json();
  const { data, error } = await supabase.from('conversations').insert(convo).select('convoId').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ convoId: data.convoId }, { status: 201 });
}