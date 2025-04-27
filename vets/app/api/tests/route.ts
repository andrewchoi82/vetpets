import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('petId');
  if (!userId) return NextResponse.json({ error: 'petId is required' }, { status: 400 });

  const { data, error } = await supabase
    .from('tests')
    .select('*')
    .eq('petId', userId)
    .order('dateOrdered', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const test = await req.json();
  const { data, error } = await supabase
    .from('tests')
    .insert(test)
    .select('testId')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ testId: data.testId }, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const updateData = await req.json();
  const { testId, ...fieldsToUpdate } = updateData;

  if (!testId) {
    return NextResponse.json({ error: 'testId is required to update' }, { status: 400 });
  }

  const { data, error } = await supabase
    .from('tests')
    .update(fieldsToUpdate)
    .eq('testId', testId)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ message: 'Test record updated successfully', data });
}
