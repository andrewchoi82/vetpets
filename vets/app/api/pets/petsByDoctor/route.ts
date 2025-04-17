import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const doctorId = searchParams.get('doctorId');
    if (!doctorId) return NextResponse.json({ error: 'doctorId is required' }, { status: 400 });
    const { data, error } = await supabase
      .from('pets')
      .select('*')
      .eq('doctorId', doctorId)
      .order('userId');
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json(data);
  }
