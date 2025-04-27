import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const petId = searchParams.get('petId');
    const filter = searchParams.get('filter'); // "upcoming" or "past"

    if (!petId) {
      return NextResponse.json({ error: 'petId is required' }, { status: 400 });
    }

    const today = new Date().toISOString().split('T')[0];
    let query = supabase.from('appointments').select('*').eq('petId', petId);

    if (filter === 'upcoming') {
      query = query.gte('date', today).order('date', { ascending: true });
    } else if (filter === 'past') {
      query = query.lte('date', today).order('date', { ascending: false });
    } else {
      // No filter: return all appointments
      query = query.order('date', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const newAppointment = await req.json();

    const { data, error } = await supabase
      .from("appointments")
      .insert(newAppointment)
      .select("apptId")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ apptId: data.apptId }, { status: 201 });
  } catch (err) {
    console.error("Error inserting appointment:", err);
    return NextResponse.json({ error: "Failed to schedule appointment" }, { status: 500 });
  }
}

