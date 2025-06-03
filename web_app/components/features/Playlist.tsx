"use client";

import useAuthModal from "@/hooks/useAuthModal";
import usePlaylistModal from "@/hooks/usePlaylistModal";
import { useUser } from "@/hooks/useUser";
import { Song } from "@/types";
import { AiOutlinePlus } from "react-icons/ai";
import { IoAlbumsOutline } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { BsMusicNoteBeamed } from "react-icons/bs";
import { FaPlay } from "react-icons/fa";
import useOnPlay from "@/hooks/useOnPlay";
import useAudioPlayer from "@/hooks/useAudioPlayer";

interface PlaylistProps {
  songs: Song[];
}

const Playlist: React.FC<PlaylistProps> = ({
  songs
}) => {
  const { user } = useUser();
  const authModal = useAuthModal();
  const addPlaylist = usePlaylistModal();
  const player = useAudioPlayer();
  const onPlay = useOnPlay(songs);

  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    return addPlaylist.onOpen();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-4 pb-2">
        <div className="inline-flex items-center gap-x-2">
          <IoAlbumsOutline className="text-neutral-400" size={20} />
          <p className="text-white font-medium text-sm">
            Create playlist
          </p>
        </div>
        <button
          onClick={onClick}
          className="
            text-neutral-400
            hover:text-white
            transition
            p-1
            hover:bg-neutral-800
            rounded-full
          "
        >
          <AiOutlinePlus size={20} />
        </button>
      </div>

      {/* Historique */}
      <div className="px-5 pt-2 pb-2 flex items-center gap-x-2">
        <LuClock3 className="text-neutral-500" size={16} />
        <p className="text-neutral-500 text-xs font-semibold uppercase">
          Recently played
        </p>
      </div>

      {/* Liste des chansons */}
      <div className="flex flex-col gap-y-1 px-3 overflow-y-auto flex-1">
        {songs.length === 0 ? (
          <p className="text-neutral-500 text-sm text-center py-4">
            Aucune chanson écoutée
          </p>
        ) : (
          songs.map((item) => (
            <div
              key={item.id}
              onClick={() => onPlay(item.id)}
              className={`
                group
                flex
                items-center
                gap-x-3
                w-full
                p-2
                rounded-md
                hover:bg-neutral-800/50
                transition
                cursor-pointer
                ${player.activeId === item.id ? 'bg-neutral-800/50' : ''}
              `}
            >
              {/* Icône musique ou image */}
              <div className="
                relative
                flex
                items-center
                justify-center
                w-10
                h-10
                min-w-[40px]
                min-h-[40px]
                bg-neutral-800
                rounded
                overflow-hidden
              ">
                {item.image_path ? (
                  <img
                    src={item.image_path}
                    alt={item.title}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <BsMusicNoteBeamed 
                  className={`text-neutral-400 ${item.image_path ? 'hidden' : ''}`} 
                  size={16} 
                />
                
                {/* Overlay play au hover */}
                <div className="
                  absolute
                  inset-0
                  bg-black/60
                  opacity-0
                  group-hover:opacity-100
                  transition
                  flex
                  items-center
                  justify-center
                ">
                  <FaPlay size={10} className="text-white" />
                </div>
              </div>

              {/* Titre et artiste */}
              <div className="flex flex-col min-w-0 flex-1">
                <p className={`
                  text-sm
                  truncate
                  ${player.activeId === item.id ? 'text-green-400' : 'text-white'}
                `}>
                  {item.title}
                </p>
                <p className="text-neutral-400 text-xs truncate">
                  {item.author}
                </p>
              </div>

              {/* Indicateur de lecture */}
              {player.activeId === item.id && (
                <div className="flex items-center gap-0.5 mr-2">
                  <span className="w-0.5 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="w-0.5 h-4 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '150ms'}} />
                  <span className="w-0.5 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '300ms'}} />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Playlist;