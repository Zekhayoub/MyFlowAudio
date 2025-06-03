"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MdMusicNote, MdMenu } from "react-icons/md";
import MobileMenu from "./MobileMenu";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import useAuthModal from "@/hooks/useAuthModal";
import { twMerge } from "tailwind-merge";

interface HeaderProps {
  children?: React.ReactNode;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  children,
  className
}) => {
  const { user } = useUser();
  const isLoggedIn = !!user;
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const authModal = useAuthModal();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.refresh();
  };

  if (children) {
    return (
      <div className={twMerge(`
        bg-gradient-to-b
        from-blue-700
        p-6
      `, className)}>
        {children}
      </div>
    );
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-blue-700 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
          {/* Logo + nom appli */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <MdMusicNote className="text-3xl" />
            <span className="font-semibold">AudioApp</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6 text-lg">
            <Link href="/liked" className="hover:underline font-medium flex items-center gap-1">
              <span role="img" aria-label="coeur">❤️</span>
              Liked
            </Link>
            <Link href="/account" className="hover:underline font-medium">
              Profil
            </Link>
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="hover:underline font-medium bg-transparent border-none outline-none cursor-pointer"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={authModal.onOpen}
                  className="hover:underline font-medium bg-transparent border-none outline-none cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={authModal.onOpen}
                  className="hover:underline font-medium bg-transparent border-none outline-none cursor-pointer"
                >
                  Register
                </button>
              </>
            )}
          </nav>

          {/* Hamburger mobile */}
          <button
            className="md:hidden text-3xl"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <MdMenu />
          </button>
        </div>
      </header>
      {/* Menu mobile */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        onLogin={authModal.onOpen}
        onRegister={authModal.onOpen}
      />
    </>
  );
};

export default Header;