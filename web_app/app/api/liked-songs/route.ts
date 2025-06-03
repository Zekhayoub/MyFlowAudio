import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import getLikedAudio from '@/actions/getLikedAudio';

// Headers CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// OPTIONS - Gérer les requêtes preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET - Récupérer toutes les chansons likées
export async function GET(request: Request) {
  try {
    // Extraire le token du header Authorization
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token manquant' },
        { status: 401, headers: corsHeaders }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Créer le client Supabase avec le token
    const supabase = createRouteHandlerClient({ cookies });
    
    // Vérifier le token et récupérer l'utilisateur
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401, headers: corsHeaders }
      );
    }

    // Récupérer les chansons likées avec la relation correcte
    const { data, error } = await supabase
      .from("liked_songs")
      .select("*, songs!fk_song(*)") // Utiliser la même relation que dans getLikedAudio
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error('Erreur fetch liked songs:', error);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des favoris' },
        { status: 500, headers: corsHeaders }
      );
    }

    if (!data) {
      return NextResponse.json([], { headers: corsHeaders });
    }

    // Extraire les chansons du résultat
    const songs = data.map((item) => ({
      ...item.songs,
    }));
    
    return NextResponse.json(songs, { headers: corsHeaders });
  } catch (error) {
    console.error('Erreur API liked songs:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des favoris' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST - Liker une chanson
export async function POST(request: Request) {
  try {
    // Extraire le token du header Authorization
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Token manquant' },
        { status: 401, headers: corsHeaders }
      );
    }

    const token = authHeader.split(' ')[1];
    
    // Créer le client Supabase
    const supabase = createRouteHandlerClient({ cookies });
    
    // Vérifier le token et récupérer l'utilisateur
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401, headers: corsHeaders }
      );
    }

    // Récupérer les données du body
    const body = await request.json();
    const { songId, songData } = body;

    console.log('POST /api/liked-songs - Received:', { songId, songData });

    let finalSongId = songId;

    // CORRECTION : Gestion spécifique des chansons Deezer
    if (songData && songData.deezer_id) {
      console.log('Processing Deezer song:', songData.deezer_id);
      
      // Vérifier si cette chanson Deezer existe déjà dans notre base
      const { data: existingSong } = await supabase
        .from('songs')
        .select('id')
        .eq('deezer_id', songData.deezer_id)
        .single(); // Retirer le .eq('user_id', user.id) car les chansons Deezer sont partagées

      if (existingSong) {
        finalSongId = existingSong.id;
        console.log('Existing Deezer song found:', finalSongId);
      } else {
        // Créer la chanson Deezer dans notre base
        console.log('Creating new Deezer song:', songData);
        
        const { data: newSong, error: insertError } = await supabase
          .from('songs')
          .insert({
            user_id: user.id, // Ou utilisateur système pour Deezer
            title: songData.title,
            author: songData.author,
            album: songData.album || null,
            language: songData.language || 'Others',
            image_path: songData.image_path || '',
            song_path: songData.song_path || `song-${songData.title?.replaceAll(" ", "-")}`,
            genre: songData.genre || 'Unknown',
            play_count: 0,
            deezer_id: songData.deezer_id // IMPORTANT : Stocker l'ID Deezer
          })
          .select()
          .single();

        if (insertError) {
          console.error('Error creating Deezer song:', insertError);
          return NextResponse.json(
            { error: `Erreur lors de la création de la chanson: ${insertError.message}` },
            { status: 500, headers: corsHeaders }
          );
        }

        if (!newSong) {
          console.error('No song returned after insert');
          return NextResponse.json(
            { error: 'Aucune chanson retournée après insertion' },
            { status: 500, headers: corsHeaders }
          );
        }

        finalSongId = newSong.id;
        console.log('New Deezer song created with ID:', finalSongId);
      }
    } else if (!finalSongId) {
      // Pour les chansons normales, songId est requis
      return NextResponse.json(
        { error: 'ID de chanson manquant' },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log('Final song ID for like:', finalSongId);

    // Vérifier si le like existe déjà
    const { data: existingLike } = await supabase
      .from('liked_songs')
      .select('id')
      .eq('user_id', user.id)
      .eq('song_id', finalSongId)
      .single();

    if (existingLike) {
      console.log('Song already liked by user');
      return NextResponse.json(
        { error: 'Chanson déjà likée' },
        { status: 409, headers: corsHeaders }
      );
    }

    // Ajouter le like
    console.log('Adding like for user:', user.id, 'song:', finalSongId);
    const { error: likeError } = await supabase
      .from('liked_songs')
      .insert({
        user_id: user.id,
        song_id: finalSongId,
      });

    if (likeError) {
      console.error('Error adding like:', likeError);
      return NextResponse.json(
        { error: `Erreur lors du like: ${likeError.message}` },
        { status: 500, headers: corsHeaders }
      );
    }

    console.log('Like added successfully');
    return NextResponse.json({ 
      success: true, 
      songId: finalSongId 
    }, { headers: corsHeaders });
    
  } catch (error) {
    console.error('POST /api/liked-songs - Error:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500, headers: corsHeaders }
    );
  }
}