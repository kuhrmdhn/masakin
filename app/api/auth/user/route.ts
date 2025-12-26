import { prisma } from "@/lib/prisma";
import { readSession } from "../utils/readSession";
import { routeHandler } from "../../utils/routeHandler";

export async function GET() {
  return routeHandler(async () => {
    const user = await readSession();

    if (!user) {
      return {
        data: null,
        authenticated: false,
      };
    }
    const userData = await prisma.users.findUnique({
      where: { id: user.id },
    });

    if (!userData) {
      return {
        data: null,
        authenticated: false,
      };
    }

    return {
      data: userData,
      authenticated: true,
    };
  });
}
