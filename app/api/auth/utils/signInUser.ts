import { supabaseServer } from "@/lib/supabaseServer";
import { signInSchema } from "@/zod/authSchema";
import z from "zod";

export async function signInUser(credentials: {
  email: string;
  password: string;
}) {
  const { auth } = await supabaseServer();
  const decodeSignInCredentials = signInSchema.safeParse(credentials);
  const {
    data: decodedData,
    success,
    error: decodedError,
  } = decodeSignInCredentials;
  if (!success) {
    if (decodedError instanceof z.ZodError) {
      const errorMessages = decodedError.issues
        .map((e) => e.message)
        .join(". ");
      throw new Error(errorMessages);
    }

    throw new Error("Schema Validation Error");
  }
  const { data, error } = await auth.signInWithPassword(decodedData);

  if (error) {
    throw new Error(error.message);
  }

  const { user } = data;
  return user;
}
