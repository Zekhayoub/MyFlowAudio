import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import getLikedSongs from '@/actions/getLikedSongs';

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
      .select("*, songs!fk_song(*)") // Utiliser la même relation que dans getLikedSongs
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

    let finalSongId = songId;

    // Si pas de songId ou si c'est une chanson Deezer, il faut créer/vérifier la chanson
    if (!finalSongId || (songData && songData.deezer_id)) {
      // D'abord vérifier si cette chanson Deezer existe déjà
      if (songData.deezer_id) {
        const { data: existingSong } = await supabase
          .from('songs')
          .select('id')
          .eq('deezer_id', songData.deezer_id)
          .eq('user_id', user.id)
          .single();
        
        if (existingSong) {
          finalSongId = existingSong.id;
        }
      }
      
      // Si la chanson n'existe pas, la créer
      if (!finalSongId) {
        const { data: newSong, error: insertError } = await supabase
          .from('songs')
          .insert({
            user_id: user.id,
            title: songData.title,
            author: songData.author,
            album: songData.album || null,
            language: songData.language || 'Others',
            image_path: songData.image_path || '',
            song_path: songData.song_path || `song-${songData.title?.replaceAll(" ", "-")}`,
            genre: songData.genre || 'Unknown',
            play_count: 0,
            deezer_id: songData.deezer_id || null // Stocker l'ID Deezer si disponible
          })
          .select()
          .single();

        if (insertError || !newSong) {
          console.error('Erreur création chanson:', insertError);
          return NextResponse.json(
            { error: 'Erreur lors de la création de la chanson' },
            { status: 500, headers: corsHeaders }
          );
        }

        finalSongId = newSong.id;
      }
    }

    // Vérifier si le like existe déjà
    const { data: existingLike } = await supabase
      .from('liked_songs')
      .select('id')
      .eq('user_id', user.id)
      .eq('song_id', finalSongId)
      .single();

    if (existingLike) {
      return NextResponse.json(
        { error: 'Chanson déjà likée' },
        { status: 409, headers: corsHeaders }
      );
    }

    // Ajouter le like
    const { error: likeError } = await supabase
      .from('liked_songs')
      .insert({
        user_id: user.id,
        song_id: finalSongId,
      });

    if (likeError) {
      console.error('Erreur like:', likeError);
      return NextResponse.json(
        { error: 'Erreur lors du like' },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json({ success: true, songId: finalSongId }, { headers: corsHeaders });
  } catch (error) {
    console.error('Erreur API like:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500, headers: corsHeaders }
    );
  }
}