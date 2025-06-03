"use client";

import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { TbPlaylist } from "react-icons/tb";
import TrackListItem from "./TrackListItem";
import useOnPlay from "@/hooks/useOnPlay";

interface UserLibraryProps {
  songs: Song[];
}

const UserLibrary: React.FC<UserLibraryProps> = ({
  songs
}) => {
  const { user } = useUser();
  const onPlay = useOnPlay(songs);

  return (
    <div className="flex flex-col">
      <div
        className="
          flex
          items-center
          justify-between
          px-5
          pt-4
        "
      >
        <div
          className="
            inline-flex
            items-center
            gap-x-2
          "
        >
          <TbPlaylist className="text-secondary" size={26} />
          <p
            className="
              text-secondary
              font-medium
              text-md
            "
          >
            Your Library
          </p>
        </div>
      </div>
      <div
        className="
          flex
          flex-col
          gap-y-2
          mt-4
          px-3
        "
      >
        {songs.length === 0 ? (
          <p className="text-secondary text-sm px-2">No songs in your library</p>
        ) : (
          songs.map((item) => (
            <TrackListItem
              onClick={(id: string) => onPlay(id)}
              key={item.id}
              data={item}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserLibrary;
