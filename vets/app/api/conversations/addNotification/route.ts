import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  const { convoId, sentByUser } = await req.json();

  if (!convoId || typeof sentByUser !== 'boolean') {
    return NextResponse.json({ error: 'convoId and sentByUser (boolean) are required' }, { status: 400 });
  }

  // Get the existing row
  const { data: convo, error: fetchError } = await supabase
    .from('conversations')
    .select('*')
    .eq('convoId', convoId)
    .single();

  if (fetchError || !convo) {
    return NextResponse.json({ error: fetchError?.message || 'Conversation not found' }, { status: 404 });
  }

  // Update the appropriate field
  const updates = sentByUser
    ? { 
        numUnreadDoctor: (convo.numUnreadDoctor || 0) + 1,
        lastMessageTime: new Date().toISOString().replace('T', ' ').replace('Z', '+00')
      }
    : { 
        numUnreadMessages: (convo.numUnreadMessages || 0) + 1,
        lastMessageTime: new Date().toISOString().replace('T', ' ').replace('Z', '+00')
      };

  const { error: updateError } = await supabase
    .from('conversations')
    .update(updates)
    .eq('convoId', convoId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
