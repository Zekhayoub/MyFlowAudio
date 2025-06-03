"use client"

import HeartButton from "@/components/features/HeartButton";
import TrackListItem from "@/components/features/TrackListItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div
                className="
                    flex
                    flex-col
                    gap-y-2
                    w-full
                    px-6
                    text-secondary
                "
            >
                No songs found.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-y-2 w-full px-6 pb-24">
            {songs.map((song) => (
                <div
                    key={song.id}
                    className="
                        flex 
                        items-center 
                        gap-x-4 
                        w-full
                        hover:bg-neutral-800/50
                        rounded-md
                        p-2
                        transition
                    "
                >
                    <div className="flex-1">
                        <TrackListItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    <HeartButton song={song} />
                </div>
            ))}
        </div>
    );
}

export default SearchContent;