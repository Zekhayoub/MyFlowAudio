import { NextResponse } from 'next/server';
import getSongsWithDeezer from '@/actions/getSongsByApi';

// Gérer les requêtes OPTIONS pour CORS
export async function OPTIONS(request: Request) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}

export async function GET(request: Request) {
  // Headers CORS
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    
    const songs = await getSongsWithDeezer(query);
    return NextResponse.json(songs, { headers });
  } catch (error) {
    console.error('Erreur API search:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la recherche' },
      { status: 500, headers }
    );
  }
}