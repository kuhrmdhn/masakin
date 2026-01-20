import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { routeHandler } from "../../utils/routeHandler";
import { pagination } from "../../utils/pagination";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const params = req.nextUrl.searchParams;
    const username = params.get("username");
    const { skip, pageNumber, pageSize } = pagination(req);

    if (!username) {
      throw new Error("Username params is required");
    }

    const memberRecipe = await prisma.recipes.findMany({
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
    const hasNextPage = totalPages < pageNumber;

    return {
      data: memberRecipe,
      message: `Successfully get ${memberRecipe.length} recipe`,
      pagination: {
        currentPage: pageNumber,
        pageSize,
        totalRecipes,
        totalPages,
        hasNextPage,
      },
    };
  });
}
