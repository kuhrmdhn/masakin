import { supabaseServer } from "@/lib/supabaseServer";
import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";

export async function signUpUser(credentials: SignUpWithPasswordCredentials) {
    try {
        const { auth } = await supabaseServer()
        const { data, error } = await auth.signUp(credentials)
        if (error) {
            throw new Error(error.message)
        }

        const { user } = data
        return user
    } catch (error) {
        console.error(error);
    }

}