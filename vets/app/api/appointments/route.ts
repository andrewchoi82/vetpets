import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const petId = searchParams.get('petId');
  if (!petId) return NextResponse.json({ error: 'petId is required' }, { status: 400 });
  const { data, error } = await supabase
    .from('appointments')
    .select('*')
    .eq('petId', petId)
    .order('date', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const newAppointment = await req.json();
  const { data, error } = await supabase.from('appointments').insert(newAppointment).select('apptId').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ apptId: data.apptId }, { status: 201 });
}