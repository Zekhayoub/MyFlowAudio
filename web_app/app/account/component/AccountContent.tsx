"use client"

import useAuthModal from "@/hooks/useAuthModal";
import useAvatarUrl from "@/hooks/useAvatarUrl";
import { useUser } from "@/hooks/useUser";
import { Settings } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MdModeEdit } from "react-icons/md";

interface AccountContentProps {
    data: Settings;
}

const AccountContent: React.FC<AccountContentProps> = ({
    data
}) => {
    const imageUrl = useAvatarUrl(data);
    const router = useRouter();
    const authModal = useAuthModal();
    const { user } = useUser();

    const onEdit = () => {
        if (!user) {
            return authModal.onOpen();
        }
        router.push("account/edit");
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative w-36 h-36">
                <Image
                    src={imageUrl || '/images/no_avatar_path.png'}
                    alt="Avatar"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full"
                />
                <div
                    className="absolute bottom-1 right-1 bg-primary rounded-full w-6 h-6 flex items-center justify-center cursor-pointer shadow-md"
                    onClick={onEdit}
                >
                    <MdModeEdit className="text-background w-4 h-4" />
                </div>
            </div>
            <div>
                <p className="text-primary text-xl font-semibold">
                    {data.full_name || "Utilisateur"}
                </p>
            </div>
        </div>
    );
}

export default AccountContent;
