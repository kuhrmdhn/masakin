import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { routeHandler } from "../utils/routeHandler";
import ApiResponse from "../utils/apiResponse";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const params = req.nextUrl.searchParams;
    const username = params.get("username");

    if (!username) {
      return ApiResponse.validationError("Username params is required");
    }

    const user = await prisma.users.findUnique({
      where: { username: username },
      omit: { email: true },
    });

    if (!user) {
      return ApiResponse.notFound(`Not found user found for: ${username}`);
    }

    return ApiResponse.success("Success get member data", user);
  });
}
