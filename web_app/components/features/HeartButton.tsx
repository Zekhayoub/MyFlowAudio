"use client";

import colors from "@/colors";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { Song } from "@/types";

interface HeartButtonProps {
  song: Omit<Song, "id" | "created_at" | "user_id">;
}

const HeartButton: React.FC<HeartButtonProps> = ({ song }) => {
  if (!song) return null;

  const router = useRouter();
  const { supabaseClient } = useSessionContext();
  const authModal = useAuthModal();
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);
  const [songId, setSongId] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id || !song?.title || !song?.author) return;

    const fetchLiked = async () => {
      const { data: songData, error: songError } = await supabaseClient
        .from("songs")
        .select("id")
        .eq("title", song.title)
        .eq("author", song.author)
        .maybeSingle();

      if (songError) return;

      if (songData) {
        setSongId(songData.id);

        const { data: like, error: likeError } = await supabaseClient
          .from("liked_songs")
          .select("*")
          .eq("user_id", user.id)
          .eq("song_id", songData.id)
          .single();

        if (!likeError && like) {
          setIsLiked(true);
        }
      }
    };

    fetchLiked();
  }, [supabaseClient, song?.title, song?.author, user?.id]);

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handleLike = async () => {
    if (!user) {
      return authModal.onOpen();
    }

    let currentSongId = songId;

    // 1. Ajout de la chanson au catalogue si elle n'existe pas
    if (!currentSongId) {
      const songToInsert = {
        title: song.title,
        author: song.author,
        //album: song.album ?? "",
        language: song.language ?? "Others",
        image_path: song.image_path ?? "",
        song_path: song.song_path ?? `song-${song.title.replaceAll(" ", "-")}`,
        //genre: song.genre ?? "Unknown",
        //track_number: song.track_number ?? 0,
        //release_date: song.release_date ?? null,
        //duration: song.duration ?? 0,
        play_count: 0,
        user_id: user.id,
        // PAS de user_id ici !
      };

      // Debug : log l'objet envoyé à Supabase (tu peux enlever après débug)
      // console.log("songToInsert", songToInsert);

      const { data, error } = await supabaseClient
        .from("songs")
        .insert([songToInsert])
        .select("id")
        .single();

      if (error || !data) {
        console.error("Erreur insertion chanson :", error);
        toast.error("Erreur insertion chanson");
        return;
      }

      currentSongId = data.id;
      setSongId(data.id);
    }

    // 2. Gestion du like/unlike
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("user_id", user.id)
        .eq("song_id", currentSongId);

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(false);
      }
    } else {
      const { error } = await supabaseClient
        .from("liked_songs")
        .insert({
          song_id: currentSongId,
          user_id: user.id,
        });

      if (error) {
        toast.error(error.message);
      } else {
        setIsLiked(true);
        toast.success("Liked!");
      }
    }

    router.refresh();
  };

  return (
    <button onClick={handleLike} className="hover:opacity-75 transition">
      <Icon color={isLiked ? colors.gradient2 : colors.primary} size={25} />
    </button>
  );
};

export default HeartButton;
