import { Song } from "@/types";
import useAudioPlayer from "./useAudioPlayer";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";
import toast from "react-hot-toast";

const useOnPlay = (songs: Song[]) => {
    const player = useAudioPlayer();
    const authModal = useAuthModal();
    const { user } = useUser();

    const onPlay = (id: string) => {
        if (!user) {
            return authModal.onOpen();
        }

        // Vérifier si c'est une chanson Deezer
        const isDeezerSong = id.startsWith('deezer-');
        const song = songs.find(s => s.id === id);
        
        if (isDeezerSong && song && !song.song_path) {
            toast.error("Preview non disponible pour cette chanson");
            return;
        }

        // Filtrer pour obtenir uniquement les IDs valides (qui ont un song_path)
        const validIds = songs
            .filter(song => song.id && song.song_path)
            .map(song => song.id);

        player.setId(id);
        player.setIds(validIds);
    };

    return onPlay;
};

export default useOnPlay;