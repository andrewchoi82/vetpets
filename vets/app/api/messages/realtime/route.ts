import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { convoId } = await req.json();
    
    const channel = supabase
        .channel(`messages_${convoId}`)
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'message',
                filter: `convoId=eq.${convoId}`
            },
            (payload) => {
                return NextResponse.json(payload);
            }
        )
        .subscribe();

    return NextResponse.json({ status: 'subscribed' });
} 