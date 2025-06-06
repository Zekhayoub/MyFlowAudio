"use client";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaPlay } from "react-icons/fa";

interface MediaCardProps {
  image: string;
  name: string;
  href: string;
}

const MediaCard: React.FC<MediaCardProps> = ({ image, name, href }) => {
  const router = useRouter();
  const authModal = useAuthModal();
  const { user } = useUser();
  const onClick = () => {
    if (!user) {
      return authModal.onOpen();
    }
    router.push(href);
  };
  return (
    <button
      onClick={onClick}
      className="
        relative
        group
        flex
        items-center
        rounded-md
        overflow-hidden
        gap-x-4
        bg-brightened/10
        hover:bg-brightened/20
        transition
        pr-4
      "
    >
      <div
        className="
          relative
          min-h-[64px]
          min-w-[64px]
        "
      >
        <Image className="object-cover" fill src={image} alt="Image" />
      </div>
      <p className="font-medium truncate py-5">{name}</p>
      <div
        className="
          absolute
          transition
          opacity-0
          rounded-full
          flex
          items-center
          bg-gradient2
          p-4
          drop-shadow-md
          right-5
          group-hover:opacity-100
          hover:scale-110
        "
      >
        <FaPlay className="text-tertiary" />
      </div>
    </button>
  );
};

export default MediaCard;
