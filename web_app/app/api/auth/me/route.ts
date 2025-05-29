import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Gérer les requêtes OPTIONS
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(request: Request) {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  
  try {
    // Récupérer le token depuis le header Authorization
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token manquant' },
        { status: 401, headers }
      );
    }

    const token = authHeader.substring(7);
    
    // Vérifier le token avec Supabase
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401, headers }
      );
    }

    return NextResponse.json({ user }, { headers });
  } catch (error) {
    console.error('Erreur /me:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500, headers }
    );
  }
}