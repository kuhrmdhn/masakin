import { supabaseServer } from "@/lib/supabaseServer";
import { signUpSchema } from "@/zod/authSchema";
import z from "zod";

type SignUp = z.infer<typeof signUpSchema>;

export async function signUpUser(credentials: SignUp) {
  const { auth } = await supabaseServer();
  const decodedSignUpCredentials = signUpSchema.safeParse(credentials);
  const {
    data: decodedData,
    success,
    error: decodedError,
  } = decodedSignUpCredentials;

  if (!success) {
    if (decodedError instanceof z.ZodError) {
      const errorMessages = decodedError.issues
        .map((e) => e.message)
        .join(". ");
      throw new Error(errorMessages);
    }

    throw new Error("Schema Validation Error");
  }

  const { data, error } = await auth.signUp({
    ...decodedData,
    options: { data: { display_name: decodedData.username } },
  });

  if (error) {
    throw new Error(error.message);
  }

  const { user } = data;
  return user;
}
