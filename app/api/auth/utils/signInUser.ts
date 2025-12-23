import { supabaseServer } from "@/lib/supabaseServer";

export async function signInUser(credential: { email: string, password: string }) {
    const { auth } = await supabaseServer();
    const { data, error } = await auth.signInWithPassword(credential);

    if (error) {
        throw new Error(error.message);
    }

    return data.user;
}