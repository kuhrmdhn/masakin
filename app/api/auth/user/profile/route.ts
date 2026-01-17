import { readSession } from "../../utils/readSession";
import { prisma } from "@/lib/prisma";
import { routeHandler } from "@/app/api/utils/routeHandler";

export async function GET() {
  return routeHandler(async () => {
    const { id } = await readSession();
    const userData = await prisma.users.findUnique({
      where: { id },
      omit: { email: true },
      include: { recipes: true },
    });
    return userData;
  });
}
