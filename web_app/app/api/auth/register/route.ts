import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { RegisterSchema, validateData } from '@/lib/validations';
import type { RegisterData } from '@/lib/validations';

export async function POST(request: Request) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');
  
  try {
    const body = await request.json();

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

    const { email, password, full_name } = validation.data as RegisterData;

    const supabase = createRouteHandlerClient({ cookies });


    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${request.headers.get('origin')}/auth/callback`,
        data: {
          full_name: full_name, 
        }
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400, headers }
      );
    }

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