import { prisma } from "@/lib/prisma";
import { User } from "@supabase/supabase-js";

export async function writeUser(user: User, fallbackEmail: string = "") {
  await prisma.users.create({
    data: {
      email: user.email ?? fallbackEmail,
      id: user.id,
      username: user.user_metadata.display_name,
    },
  });
}
