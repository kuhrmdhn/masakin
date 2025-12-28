import { supabaseServer } from "@/lib/supabaseServer";

export async function readSession() {
  const { auth } = await supabaseServer();
  const { data, error } = await auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
}

