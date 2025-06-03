"use client";

import LoginModal from "@/components/features/LoginModal";
import AddPlaylist from "@/components/features/AddPlaylist";
import { useEffect, useState } from "react";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <LoginModal />
      <AddPlaylist />
    </>
  );
};

export default ModalProvider;