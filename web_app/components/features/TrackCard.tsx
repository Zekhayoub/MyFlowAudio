"use client";

import useImageUrl from "@/hooks/useImageUrl";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./PlayButton";

interface TrackCardProps {
    data: Song;
    onClick: (id: string) => void;
};

const TrackCard: React.FC<TrackCardProps> = ({
    data,
    onClick
}) => {
    // const imagePath = useImageUrl(data);

    return (
        <div
            onClick={() => onClick(data.id)}
            className="
                relative
                group
                flex
                flex-col
                items-center
                justify-center
                rounded-md
                overflow-hidden
                gap-x-4
                bg-secondary/5
                cursor-pointer
                hover:bg-secondary/10
                transition
                p-3
            "
        >
            <div
                className="
                    relative
                    aspect-square
                    w-full
                    h-full
                    rounded-md
                    overflow-hidden
                "
            >
                <Image
                    className="object-cover"
                    src={data.image_path || '/images/no_image_path.jpg'}
                    fill
                    alt='Image'
                />
            </div>
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                <p className="font-semibold truncate w-full">
                    {data.title}
                </p>
                <p
                    className="
                        text-secondary
                        text-sm
                        pb-4
                        w-full
                        trucate
                    "
                >
                    By {data.author}
                </p>
            </div>
            <div className="absolute bottom-24 right-5">
                <PlayButton />
            </div>
        </div>
    );
}

export default TrackCard;
