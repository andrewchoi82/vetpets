import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const petId = searchParams.get('petId');
  if (!petId) return NextResponse.json({ error: 'petId is required' }, { status: 400 });

  const { data, error } = await supabase
    .from('medical_history')
    .select('*')
    .eq('petId', petId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const medicalHistory = await req.json();
  const { data, error } = await supabase
    .from('medical_history')
    .insert(medicalHistory)
    .select('historyId')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ historyId: data.historyId }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const updateData = await req.json();
  const { historyId, ...fieldsToUpdate } = updateData;

  if (!historyId) {
    return NextResponse.json({ error: 'historyId is required to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('medical_history')
    .update(fieldsToUpdate)
    .eq('historyId', historyId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Medical history record updated successfully', data });
}
