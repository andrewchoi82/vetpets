import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const petId = searchParams.get('petId');
  
  if (!petId) return NextResponse.json({ error: 'petId is required' }, { status: 400 });
  
  const { data, error } = await supabase
    .from('conversations')
    .select('numUnreadMessages')
    .eq('petId', petId);
    
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  
  // Sum up all numUnreadMessages
  const totalUnreadMessages = data.reduce((sum, conversation) => {
    return sum + (conversation.numUnreadMessages || 0);
  }, 0);
  
  return NextResponse.json({ totalUnreadMessages });
}

