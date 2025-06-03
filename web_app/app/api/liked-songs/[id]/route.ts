import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Headers CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// OPTIONS - Gérer les requêtes preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// DELETE - Unliker une chanson
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const songId = params.id;

    // Supprimer le like
    const { error } = await supabase
      .from('liked_songs')
      .delete()
      .eq('user_id', user.id)
      .eq('song_id', songId);

    if (error) {
      console.error('Erreur unlike:', error);
      return NextResponse.json(
        { error: 'Erreur lors du unlike' },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json({ success: true }, { headers: corsHeaders });
  } catch (error) {
    console.error('Erreur API unlike:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500, headers: corsHeaders }
    );
  }
}