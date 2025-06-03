import getLikedAudio from "@/actions/getLikedAudio";
import Header from "@/components/features/Header";
import LikedContent from "./components/LikedContent";
import { FaHeart } from "react-icons/fa";

export const revalidate = 0;

const Liked = async () => {
  const songs = await getLikedAudio();

  return (
    <div
      className="
        bg-background
        rounded-lg
        h-full
        w-full
        overflow-hidden
        overflow-y-auto
      "
    >
      <Header>
        <div className="flex flex-col gap-y-6">
          {/* Header minimaliste avec icône */}
          <div className="flex items-center gap-x-5">
            <div className="
              flex
              items-center
              justify-center
              w-20
              h-20
              bg-gradient-to-br
              from-purple-600
              to-pink-600
              rounded-lg
              shadow-lg
            ">
              <FaHeart size={35} className="text-white" />
            </div>
            
            <div className="flex flex-col gap-y-1">
              <p className="text-sm font-medium text-neutral-400">
                Playlist
              </p>
              <h1 className="text-white text-4xl font-bold">
                Liked Songs
              </h1>
              <p className="text-sm text-neutral-400 mt-1">
                {songs.length} {songs.length === 1 ? 'song' : 'songs'}
              </p>
            </div>
          </div>
        </div>
      </Header>
      
      <LikedContent songs={songs} />
    </div>
  );
};

export default Liked;