import { NextRequest } from "next/server";
import { signUpUser } from "../utils/signUpUser";
import { writeUser } from "../utils/writeUser";
import { routeHandler } from "../../utils/routeHandler";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const body = await req.json();
    const { email, username, password } = body;
    const credentials = {
      email,
      password,
      username,
    };
    if (!username || typeof username !== "string") {
      throw new Error("Nama pengguna tidak boleh kosong");
    }

    const userFilter = await prisma.users.findUnique({
      where: {
        username: username,
      },
    });

    if (userFilter) {
      throw new Error(
        "Nama pengguna sudah digunakan, silahkan ganti nama pengguna atau masuk ke akun yang sudah terdaftar",
      );
    }

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
