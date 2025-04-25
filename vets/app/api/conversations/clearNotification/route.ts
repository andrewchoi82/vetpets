import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
  const { convoId, sentByUser } = await req.json();

  if (!convoId || typeof sentByUser !== 'boolean') {
    return NextResponse.json({ error: 'convoId and sentByUser (boolean) are required' }, { status: 400 });
  }

  const updates = sentByUser
    ? { numUnreadDoctor: 0 }
    : { numUnreadMessages: 0 };

  const { error: updateError } = await supabase
    .from('conversations')
    .update(updates)
    .eq('convoId', convoId);

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
