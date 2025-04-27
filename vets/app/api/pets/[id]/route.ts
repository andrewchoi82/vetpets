import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  const petId = Number(params.id);

  if (isNaN(petId)) {
    return NextResponse.json({ error: 'Invalid petId format' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('pets')
    .select('*')
    .eq('petId', petId)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}