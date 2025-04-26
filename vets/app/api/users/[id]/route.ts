import { supabase } from '@/app/lib/supabaseClient';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'cookie';
import { verifyJWT } from '@/app/lib/jwt';
import bcrypt from 'bcrypt';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  const id = params.id;

  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized: Invalid or expired token' }, { status: 401 });
  }

  // Comment out the ID check for now - we'll implement proper UUID handling later
  // console.log('Token ID:', decoded.userId);
  // console.log('URL ID:', id);
  // if (decoded.userId !== parseInt(id)) {
  //   return NextResponse.json({ error: 'Forbidden: ID mismatch' }, { status: 403 });
  // }

  const { data, error } = await supabase
    .from('users')
    .select('id, username, userType')
    .eq('id', id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
  const { params } = context;
  const id = params.id;
  
  // Authentication check (similar to GET)
  const cookieHeader = request.headers.get('cookie') || '';
  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const decoded = verifyJWT(token);
  if (!decoded) {
    return NextResponse.json({ error: 'Unauthorized: Invalid or expired token' }, { status: 401 });
  }

  // Comment out the ID check for now - we'll implement proper UUID handling later
  // console.log('Token ID:', decoded.userId);
  // console.log('URL ID:', id);
  // if (decoded.userId !== parseInt(id)) {
  //   return NextResponse.json({ error: 'Forbidden: ID mismatch' }, { status: 403 });
  // }

  try {
    const updateData = await request.json();
    console.log('Update request for user:', id, 'with data:', updateData);
    
    // Special handling for password updates
    if (updateData.password) {
      // Hash the new password
      const hashedPassword = await bcrypt.hash(updateData.password, 10);
      // Replace with password_hash field for database
      delete updateData.password;
      updateData.password_hash = hashedPassword;
    }

    // Update user in database
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      data 
    });
  } catch (error: any) {
    console.error('Server error during user update:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'An unknown error occurred' 
    }, { status: 500 });
  }
}