import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const petId = searchParams.get('petId');
    
    if (!petId) {
      return NextResponse.json({ error: 'petId is required' }, { status: 400 });
    }
    
    // Get current date in ISO format (YYYY-MM-DD)
    const today = new Date().toISOString().split('T')[0];
    
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .eq('petId', petId)
      .gte('date', today) // Only get appointments from today onwards
      .order('date', { ascending: true }); // Changed to ascending to show soonest first
      
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching appointments:', err);
    return NextResponse.json({ error: 'Failed to fetch appointments' }, { status: 500 });
  }
}