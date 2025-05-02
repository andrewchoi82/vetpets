import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const doctorId = searchParams.get('doctorId');
  if (!doctorId) return NextResponse.json({ error: 'doctorId is required' }, { status: 400 });
  
  const { data, error } = await supabase
  .from('conversations')
  .select('numUnreadDoctor')
  .eq('doctorId', doctorId); // Make sure you're using doctorId filter

if (error) {
  return NextResponse.json({ error: error.message }, { status: 400 });
}

const totalUnreadMessages = data.reduce((sum, convo) => {
  return sum + (convo.numUnreadDoctor || 0);
}, 0);

return NextResponse.json({ totalUnreadMessages });
}
