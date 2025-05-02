import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const petId = searchParams.get('petId');
  if (!petId) return NextResponse.json({ error: 'petId is required' }, { status: 400 });

  const { data, error } = await supabase
    .from('vaccinations')
    .select('*')
    .eq('petId', petId);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  // Format dates before sending response
  const formattedData = data.map((item: any) => ({
    ...item,
    date: item.date ? new Date(item.date).toISOString() : null
  }));

  return NextResponse.json(formattedData);
}

export async function POST(req: NextRequest) {
  const vaccination = await req.json();
  const { data, error } = await supabase
    .from('vaccinations')
    .insert(vaccination)
    .select('vaccineId')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ vaccinationId: data.vaccineId }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const updateData = await req.json();
  const { vaccinationId, ...fieldsToUpdate } = updateData;

  if (!vaccinationId) {
    return NextResponse.json({ error: 'vaccinationId is required to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('vaccinations')
    .update(fieldsToUpdate)
    .eq('vaccinationId', vaccinationId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Vaccination updated successfully', data });
}
