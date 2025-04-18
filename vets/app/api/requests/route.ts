import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const requestId = searchParams.get('requestId');
    
    if (!requestId) {
      return NextResponse.json({ error: 'requestId is required' }, { status: 400 });
    }
    
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('requestId', requestId);
      
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    
    return NextResponse.json(data);
  } catch (err) {
    console.error('Error fetching requests:', err);
    return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const newRequest = await req.json();
  const { data, error } = await supabase.from('requests').insert(newRequest).select('requestId').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ requestId: data.requestId }, { status: 201 });
}