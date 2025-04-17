import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const newPet = await req.json();
  const { data, error } = await supabase.from('pets').insert(newPet).select('petId').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ petId: data.petId }, { status: 201 });
}