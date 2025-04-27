import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const petId = searchParams.get('petId');
  if (!petId) return NextResponse.json({ error: 'petId is required' }, { status: 400 });

  const { data, error } = await supabase
    .from('medications')
    .select('*')
    .eq('petId', petId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const medication = await req.json();
  const { data, error } = await supabase
    .from('medications')
    .insert(medication)
    .select('medicationId')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ medicationId: data.medicationId }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const updateData = await req.json();
  const { medicationId, ...fieldsToUpdate } = updateData;

  if (!medicationId) {
    return NextResponse.json({ error: 'medicationId is required to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('medications')
    .update(fieldsToUpdate)
    .eq('medicationId', medicationId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Medication record updated successfully', data });
}
