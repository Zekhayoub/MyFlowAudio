import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RegisterSchema, validateData } from '@/lib/validations';
import type { RegisterData } from '@/lib/validations';

// ✅ TYPED API ENDPOINT - Secure registration with validation
export async function POST(request: Request) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  
  try {
    const body = await request.json();

    // ✅ USER-SUBMITTED DATA VALIDATION - Validate registration data
    const validation = validateData(RegisterSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed. Please check your registration information.',
          details: validation.errors
        },
        { status: 400, headers }
      );
    }

    // ✅ TYPE-SAFE DATA EXTRACTION - TypeScript ensures correct types
    const { email, password, full_name } = validation.data as RegisterData;

    const supabase = createRouteHandlerClient({ cookies });

    // Register with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${request.headers.get('origin')}/auth/callback`,
        data: {
          full_name: full_name, // Store full name in user metadata
        }
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400, headers }
      );
    }

    // ✅ COMPATIBLE RESPONSE - Keep your existing format
    return NextResponse.json({
      user: data.user,
      message: 'Vérifiez votre email pour confirmer votre compte',
    }, { headers });

  } catch (error) {
    console.error('Erreur register:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500, headers }
    );
  }
}