import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Attention rappelle, modification, utilise createClient au lieu de createRouteHandlerClient
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

export async function POST(request: Request) {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  
  try {
    const body = await request.json();
    const { email, password } = body;

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


