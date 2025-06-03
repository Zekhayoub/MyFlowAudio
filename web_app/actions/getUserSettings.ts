import { Settings } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getUserSettings = async (): Promise<Settings[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const {
        data: {
            session
        }
    } = await supabase.auth.getSession();

    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', session?.user?.id);

    if (error) {
        console.log(error);
        return [];
    }

    if (!data) {
        return [];
    }

    return data as [];
};

export default getUserSettings;
