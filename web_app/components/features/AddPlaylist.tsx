"use client";

import usePlaylistModal from "@/hooks/usePlaylistModal";
import BaseModal from "../ui/BaseModal";
import FormInput  from "../ui/FormInput";
import BaseButton from "../ui/BaseButton";
import { useUser } from "@/hooks/useUser";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { createPlaylist } from "@/actions/createPlaylist";

const AddPlaylist = () => {
  const addPlaylist = usePlaylistModal();
  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const searchParams = useSearchParams();
  const created = searchParams.get("created");

  useEffect(() => {
    if (created === "1") {
      toast.success("Playlist created!");
      addPlaylist.onClose();
      formRef.current?.reset();
    }
  }, [created]);

  const onChange = (open: boolean) => {
    if (!open) {
      formRef.current?.reset();
      addPlaylist.onClose();
    }
  };

  return (
    <BaseModal
      title="Add a playlist"
      description="Creation of a new playlist"
      isOpen={addPlaylist.isOpen}
      onChange={onChange}
    >
      <form
        ref={formRef}
        action={createPlaylist}
        method="post"
        className="flex flex-col gap-y-4"
      >
        <FormInput 
          id="name"
          name="name"
          required
          placeholder="Playlist name"
        />

        {/* champ caché pour user_id */}
        <FormInput  type="hidden" name="user_id" value={user?.id || ""} />

        <BaseButton type="submit">
          Create
        </BaseButton>
      </form>
    </BaseModal>
  );
};

export default AddPlaylist;


