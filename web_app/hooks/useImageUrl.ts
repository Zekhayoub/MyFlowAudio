import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useImageUrl = (song: Song) => {
    const supabaseClient = useSupabaseClient();

    if (!song) {
        return null;
    }

    // Si pas d'image, retourner le placeholder
    if (!song.image_path) {
        return "/images/no_image_path.jpg";
    }

    // Si c'est déjà une URL complète (Deezer ou autre)
    if (song.image_path.startsWith('http://') || song.image_path.startsWith('https://')) {
        return song.image_path;
    }

    // Si c'est un chemin local (comme /images/...)
    if (song.image_path.startsWith('/')) {
        return song.image_path;
    }

    // Sinon, c'est un path Supabase
    const { data: imageData } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(song.image_path);

    return imageData.publicUrl;
};

export default useImageUrl;
