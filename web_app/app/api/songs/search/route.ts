import { NextResponse } from 'next/server';
import getSongsWithDeezer from '@/actions/getAudioByAPI';
import { SongSearchSchema, validateData } from '@/lib/validations';
import type { SongSearchData } from '@/lib/validations';

// Handle CORS preflight requests
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

// ✅ TYPED API ENDPOINT - Secure song search with validation
export async function GET(request: Request) {
  // CORS headers
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET');
  headers.set('Access-Control-Allow-Headers', 'Content-Type');
  headers.set('Content-Type', 'application/json');
  
  try {
    const { searchParams } = new URL(request.url);
    const queryParam = searchParams.get('q') || searchParams.get('query') || '';
    
    // Prepare data for validation
    const searchData = { query: queryParam };

    // ✅ USER-SUBMITTED DATA VALIDATION - Validate search query
    const validation = validateData(SongSearchSchema, searchData);
    if (!validation.success) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid search query',
          errors: validation.errors,
          message: 'Please provide a valid search term'
        },
        { status: 400, headers }
      );
    }

    // ✅ TYPE-SAFE DATA EXTRACTION - TypeScript ensures correct types
    const { query } = validation.data as SongSearchData;

    // Call your existing search function
    const songs = await getSongsWithDeezer(query);
    
    // ✅ TYPED RESPONSE - Consistent API response format
    return NextResponse.json({
      success: true,
      data: {
        songs: songs,
        query: query,
        total: Array.isArray(songs) ? songs.length : 0
      },
      message: `Found ${Array.isArray(songs) ? songs.length : 0} songs for "${query}"`
    }, { headers });

  } catch (error) {
    console.error('Erreur API search:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Search failed',
        message: 'An error occurred while searching for songs'
      },
      { status: 500, headers }
    );
  }
}