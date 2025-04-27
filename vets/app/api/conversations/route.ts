import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const petId = searchParams.get('petId');
  
  if (!petId) return NextResponse.json({ error: 'petId is required' }, { status: 400 });
  
  const { data, error } = await supabase
    .from('conversations')
    .select('*')
    .eq('petId', petId)
    .order('lastMessageTime', { ascending: false });
    
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  
  // Transform data to match frontend expectations
  const formattedData = data.map(conversation => {
    // Create a Date object from the timestamp
    const lastMessageTime = new Date(conversation.lastMessageTime);
    
    return {
      convoId: conversation.convoId,
      name: conversation.name,
      petId: conversation.petId,
      doctorId: conversation.doctorId,
      numUnreadMessages: conversation.numUnreadMessages,
      lastMessageTime: conversation.lastMessageTime,
      userId: conversation.userId,

      // Format the date and time as expected by the frontend
      recentDate: lastMessageTime.toISOString().split('T')[0], // YYYY-MM-DD format
      recentTime: lastMessageTime.toTimeString().split(' ')[0].slice(0, 5) // HH:MM format
    };
  });
  
  return NextResponse.json(formattedData);
}

export async function POST(req: NextRequest) {
  const convo = await req.json();
  const { data, error } = await supabase.from('conversations').insert(convo).select('convoId').single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ convoId: data.convoId }, { status: 201 });
}