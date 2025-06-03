"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { IoSparkles } from "react-icons/io5";
import { IoCompassOutline } from "react-icons/io5";
import Box from "../ui/Container";
import SidebarLink from "./SidebarLink";
import UserLibrary from "./UserLibrary";
import { Song } from "@/types";
import useAudioPlayer from "@/hooks/useAudioPlayer";
import { twMerge } from "tailwind-merge";
import Playlist from "./Playlist";

interface SidebarProps {
  children: React.ReactNode;
  songs : Song[]
}

const SideBar: React.FC<SidebarProps> = ({
  children,
  songs
}) => {
  const pathname = usePathname();
  const player = useAudioPlayer();
  const routes = useMemo(
    () => [
      {
        icon: IoSparkles,
        label: "Discover",
        active: pathname !== "/search",
        href: "/",
      },
      {
        icon: IoCompassOutline,
        label: "Explorer",
        active: pathname === "/search",
        href: "/search",
      },
    ],
    [pathname],
  );

  return (
    <div className={
      twMerge(`flex h-full`, player.activeId && "h-[calc(100%-90px)]")
    }>
      <div
        className="
          hidden
          md:flex
          flex-col
          gap-y-2
          bg-background0
          h-full
          w-[300px]
          p-2
        "
      >
        <Box className="py-4">
          <div
            className="
              flex
              flex-col
              gap-y-4
              px-5
            "
          >
            {routes.map((item) => (
              <SidebarLink key={item.label} {...item} />
            ))}
          </div>
        </Box>
        <Box className="overflow-y-auto h-full">
          <Playlist songs={songs}/>
        </Box>
      </div>
      <main className="h-full flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default SideBar;