import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get('doctorId');

    if (!doctorId) {
      return NextResponse.json({ error: 'doctorId is required' }, { status: 400 });
    }

    // First, get all pets associated with this doctor
    const { data: pets, error: petsError } = await supabase
      .from('pets')
      .select('petId')
      .eq('doctorId', doctorId);

    if (petsError) {
      return NextResponse.json({ error: petsError.message }, { status: 400 });
    }

    if (!pets || pets.length === 0) {
      return NextResponse.json([]); // Return empty array if no pets found
    }

    // Extract petIds from the pets array
    const petIds = pets.map(pet => pet.petId);

    // Then, get all appointments for these pets
    const { data: appointments, error: appointmentsError } = await supabase
      .from('appointments')
      .select('*')
      .in('petId', petIds)
      .order('date', { ascending: false });

    if (appointmentsError) {
      return NextResponse.json({ error: appointmentsError.message }, { status: 400 });
    }

    return NextResponse.json(appointments || []);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}
