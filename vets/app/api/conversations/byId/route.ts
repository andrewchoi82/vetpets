import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const convoId = searchParams.get('convoId');

  if (!convoId) {
    return NextResponse.json({ error: 'convoId is required' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('convoId', convoId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}