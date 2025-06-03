"use client"

import { Song } from "@/types";
import TrackListItem from "./TrackListItem";
import HeartButton from "./HeartButton";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import RangeSlider  from "../ui/RangeSlider";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound";

interface PlayerControlsProps {
    song: Song;
    songUrl: string;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({
    song,
    songUrl
}) => {
    const player = useAudioPlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDeezerPreview, setIsDeezerPreview] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    // Détecter si c'est une preview Deezer
    useEffect(() => {
        const isDeezer = song.id.startsWith('deezer-') || songUrl.includes('cdn-preview');
        setIsDeezerPreview(isDeezer);
    }, [song.id, songUrl]);

    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }
        
        player.setId(previousSong);
    }

    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }
        
        player.setId(nextSong);
    }

    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3'],
            html5: true, // Important pour les URLs externes
            onloaderror: (id, error) => {
                console.error('Erreur de chargement:', error);
                onPlayNext();
            }
        }
    );

    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    // Mise à jour du temps actuel et de la durée
    useEffect(() => {
        const interval = setInterval(() => {
            if (sound && isPlaying) {
                setCurrentTime(sound.seek() || 0);
                setDuration(sound.duration() || 0);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [sound, isPlaying]);

    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    };

    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }

    // Fonction pour formater le temps en mm:ss
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "0:00";
        
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // Fonction pour gérer le changement de position dans la chanson
    const handleSeek = (value: number) => {
        if (sound) {
            sound.seek(value);
            setCurrentTime(value);
        }
    };

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <TrackListItem data={song}/>
                    <div className="flex items-center gap-x-2">
                        <HeartButton song={song} />
                        {isDeezerPreview && (
                            <span className="
                                text-xs 
                                text-neutral-400 
                                bg-neutral-800 
                                px-2 
                                py-1 
                                rounded-full
                            ">
                                Preview
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Contrôles mobile */}
            <div
                className="
                    flex
                    md:hidden
                    col-auto
                    w-full
                    justify-end
                    items-center
                "
            >
                <div
                    onClick={handlePlay}
                    className="
                        h-10
                        w-10
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-white
                        p-1
                        cursor-pointer
                    "
                >
                    <Icon size={30} className="text-black"/>
                </div>
            </div>

            {/* Contrôles desktop avec barre de progression */}
            <div
                className="
                    hidden
                    h-full
                    md:flex
                    flex-col
                    justify-center
                    items-center
                    w-full
                    max-w-[722px]
                    gap-y-2
                "
            >
                {/* Contrôles de lecture */}
                <div className="flex items-center gap-x-6">
                    <AiFillStepBackward
                        onClick={onPlayPrevious}
                        size={30}
                        className="
                            text-neutral-400
                            cursor-pointer
                            hover:text-white
                            transition
                        "
                    />
                    <div
                        onClick={handlePlay}
                        className="
                            h-10
                            w-10
                            flex
                            items-center
                            justify-center
                            rounded-full
                            bg-white
                            p-1
                            cursor-pointer
                        "
                    >
                        <Icon size={30} className="text-black"/>
                    </div>
                    <AiFillStepForward
                        onClick={onPlayNext}
                        size={30}
                        className="
                            text-neutral-400
                            cursor-pointer
                            hover:text-white
                            transition
                        "
                    />
                </div>

                {/* Barre de progression avec temps */}
                <div className="flex items-center gap-x-2 w-full">
                    <span className="text-xs text-neutral-400 min-w-[40px] text-right">
                        {formatTime(currentTime)}
                    </span>
                    <RangeSlider 
                        value={currentTime}
                        onChange={handleSeek}
                        max={duration || 1}
                        step={0.1}
                        className="flex-1"
                    />
                    <span className="text-xs text-neutral-400 min-w-[40px]">
                        {formatTime(duration)}
                        {isDeezerPreview && duration > 0 && " (Preview)"}
                    </span>
                </div>
            </div>

            {/* Contrôle du volume */}
            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className="cursor-pointer"
                        size={34}
                    />
                    <RangeSlider 
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>
        </div>
    );
}

export default PlayerControls;
