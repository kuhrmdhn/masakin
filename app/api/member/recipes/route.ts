import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { routeHandler } from "../../utils/routeHandler";
import { pagination } from "../../utils/pagination";
import ApiResponse from "../../utils/apiResponse";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const params = req.nextUrl.searchParams;
    const username = params.get("username");
    const { skip, pageNumber, pageSize } = pagination(req);

    if (!username) {
      return ApiResponse.validationError("Username params is required");
    }

    const memberRecipes = await prisma.recipes.findMany({
      where: { author: { username } },
      include: { author: true },
      skip,
      take: pageSize,
      orderBy: { created_at: "desc" },
    });

    const totalRecipes = await prisma.recipes.count({
      where: { author: { username: username } },
    });
    const totalPages = Math.ceil(totalRecipes / pageSize);

    return ApiResponse.paginated(
      `Successfully get ${memberRecipes.length} recipe`,
      pageNumber,
      totalPages,
      memberRecipes
    )
  });
}
