import { readSession } from "../../utils/readSession";
import { prisma } from "@/lib/prisma";
import { routeHandler } from "@/app/api/utils/routeHandler";
import ApiResponse from "@/app/api/utils/apiResponse";

export async function GET() {
  return routeHandler(async () => {
    const { id } = await readSession();
    const userData = await prisma.users.findUnique({
      where: { id },
      omit: { email: true },
    });

    if (!userData) {
      return ApiResponse.unauthenticated();
    }

    return ApiResponse.success(
      `Get profile for: ${userData.username}`,
      userData,
    );
  });
}
