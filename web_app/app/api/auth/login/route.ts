import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { LoginSchema, validateData } from '@/lib/validations';
import type { LoginData } from '@/lib/validations';

// Keep your existing createClient setup
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

// ✅ TYPED API ENDPOINT - Secure and fully typed communication
export async function POST(request: Request) {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Content-Type', 'application/json');
  
  try {
    const body = await request.json();

    // ✅ USER-SUBMITTED DATA VALIDATION - Validate login credentials
    const validation = validateData(LoginSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed. Please check your email and password format.',
          details: validation.errors
        },
        { status: 400, headers }
      );
    }

    // ✅ TYPE-SAFE DATA EXTRACTION - TypeScript knows exact types
    const { email, password } = validation.data as LoginData;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Login error:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 401, headers }
      );
    }

    // ✅ COMPATIBLE RESPONSE - Keep your existing format for mobile app
    return NextResponse.json({
      user: data.user,
      session: data.session,
      token: data.session?.access_token,
    }, { headers });

  } catch (error) {
    console.error('Erreur login:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500, headers }
    );
  }
}