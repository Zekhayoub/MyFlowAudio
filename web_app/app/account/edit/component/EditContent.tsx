
"use client";

import useAvatarUrl from "@/hooks/useAvatarUrl";
import { Settings } from "@/types";
import Image from "next/image";
import { updateUserName } from "@/actions/updateUserName";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

interface AccountContentProps {
  data: Settings;
}

const AccountContent: React.FC<AccountContentProps> = ({ data }) => {
  const imageUrl = useAvatarUrl(data);
  const searchParams = useSearchParams();
  const success = searchParams.get("success");

  useEffect(() => {
    if (success === "1") {
      toast.success("Nom mis à jour !");
    }
  }, [success]);

  return (
    <form
      action={updateUserName}
      method="post"
      className="flex flex-col items-center space-y-4"
    >
      <div className="relative w-36 h-36">
        <Image
          src={imageUrl || "/images/no_avatar_path.png"}
          alt="Avatar"
          layout="fill"
          objectFit="cover"
        />
      </div>

      <input
        type="text"
        name="full_name"
        placeholder="Nom complet"
        className="p-2 rounded-md text-black"
        defaultValue={data.full_name}
      />

      <input type="hidden" name="user_id" value={data.id} />

      <button
        type="submit"
        className="mt-2 bg-gradient2 text-white px-4 py-2 rounded"
      >
        Edit
      </button>
    </form>
  );
};

export default AccountContent;

