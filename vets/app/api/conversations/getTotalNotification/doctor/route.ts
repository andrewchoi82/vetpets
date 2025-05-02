import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get('doctorId');
  if (!doctorId) return NextResponse.json({ error: 'doctorId is required' }, { status: 400 });
  
  const { data, error } = await supabase
    .from('conversations')
    .select('numUnreadDoctor')
    .eq('doctorId', doctorId);
    
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  
  // Sum up all numUnreadDoctor values
  const totalUnreadMessages = data.reduce((sum, conversation) => {
    return sum + (conversation.numUnreadDoctor || 0);
  }, 0);
  
  return NextResponse.json({ totalUnreadMessages });
}
