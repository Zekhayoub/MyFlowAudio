"use client"

import useTrackDetails from "@/hooks/useTrackDetails";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import PlayerControls from "./PlayerControls"; 

const AudioPlayer = () => {
    const player = useAudioPlayer();
    const { song } = useTrackDetails(player.activeId);

    if(!song || !song.song_path || !player.activeId) {
        return null;
    }

    return (
        <div
            className="
                fixed
                bottom-0
                bg-player
                w-full
                py-2
                h-[90px]
                px-4
            "
        >
            <PlayerControls
                key={song.song_path}
                song={song}
                songUrl={song.song_path}
            />
        </div>
    );
}

export default AudioPlayer;
