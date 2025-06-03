import { Settings } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useAvatarUrl = (settings: Settings) => {
    const supabaseClient = useSupabaseClient();

    if (!settings.avatar_path) {
        return "/images/no_avatar_path.png";
    }

    const { data: imageData } = supabaseClient
        .storage
        .from('avatars')
        .getPublicUrl(settings.avatar_path);

    return imageData.publicUrl;
};

export default useAvatarUrl;
