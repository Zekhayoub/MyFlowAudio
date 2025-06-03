"use client"

import useImageUrl from "@/hooks/useImageUrl";
import { Song } from "@/types";
import Image from "next/image";
import { BsMusicNote } from "react-icons/bs";
import useAudioPlayer from "@/hooks/useAudioPlayer";

interface TrackListItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

const TrackListItem: React.FC<TrackListItemProps> = ({
    data,
    onClick
}) => {
    const imageUrl = useImageUrl(data);
    const player = useAudioPlayer();
    
    // Vérifier si c'est une chanson Deezer avec vérification de sécurité
    const isDeezerSong = (data.id && data.id.startsWith('deezer-')) || data.user_id === 'deezer-api';
    const isPlaying = data.id && player.activeId === data.id;

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }
        
        player.setId(data.id);
    }

    return (
        <div
            onClick={handleClick}
            className="
                flex
                items-center
                gap-x-3
                cursor-pointer
                hover:bg-brightened/5
                w-full
                p-2
                rounded-md
            "
        >
            <div
                className="
                    relative
                    rounded-md
                    min-h-[48px]
                    min-w-[48px]
                    overflow-hidden
                "
            >
                <Image
                    fill
                    src={imageUrl || '/images/no_image_path.jpg'}
                    alt="Media Item"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden flex-1">
                <p className={`truncate ${isPlaying ? 'text-green-400' : 'text-primary'}`}>
                    {data.title}
                </p>
                <div className="flex items-center gap-x-2">
                    <p className="text-secondary text-sm truncate flex-1">
                        {data.author}
                    </p>
                    {isDeezerSong && (
                        <div className="flex items-center gap-x-1">
                            <BsMusicNote className="text-neutral-500" size={12} />
                            <span className="text-xs text-neutral-500">Preview</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default TrackListItem;
