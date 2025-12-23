import { SignUpWithPasswordCredentials } from "@supabase/supabase-js";
import { NextRequest } from "next/server";
import { signUpUser } from "../utils/signUpUser";
import { writeUser } from "../utils/writeUser";
import { routeHandler } from "../../utils/routeHandler";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const body = await req.json();
    const { email, username, password } = body;
    const credentials: SignUpWithPasswordCredentials = {
      email,
      password,
      options: {
        data: { display_name: username },
      },
    };
    if (!username || typeof username !== "string") {
      return new Response("Username is required", { status: 400 });
    }

    const userFilter = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    const user = await signUpUser(credentials);
    if (!user) {
      throw new Error("Failed to sign up, try again later");
    }
    await writeUser(user);

    return {
      message: "Sign up data received successfully",
      data: username,
    };
  });
}
