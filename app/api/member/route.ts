import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { routeHandler } from "../utils/routeHandler";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const params = req.nextUrl.searchParams;
    const username = params.get("username");

    if (!username) {
      throw new Error("Username params is required");
    }

    const user = await prisma.users.findUnique({
      where: { username: username },
      omit: { email: true },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return { data: user };
  });
}
