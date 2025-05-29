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
    // Vérifier l'authentification
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401, headers }
      );
    }

    const token = authHeader.substring(7);
    
    // Vérifier le token et récupérer l'utilisateur
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401, headers }
      );
    }

    // Récupérer les chansons de l'utilisateur
    const { data: songs, error } = await supabase
      .from('songs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erreur récupération songs:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des chansons' },
        { status: 500, headers }
      );
    }

    return NextResponse.json(songs || [], { headers });
  } catch (error) {
    console.error('Erreur API songs:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500, headers }
    );
  }
}