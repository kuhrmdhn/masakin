import { routeHandler } from "@/app/api/utils/routeHandler";
import { readSession } from "../../utils/readSession";
import { prisma } from "@/lib/prisma";
import { pagination } from "@/app/api/utils/pagination";
import { NextRequest } from "next/server";
import ApiResponse from "@/app/api/utils/apiResponse";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const { id } = await readSession();
    const { skip, pageNumber, pageSize } = pagination(req);
    const userRecipe = await prisma.recipes.findMany({
      where: { author_id: id },
      include: { author: true },
      skip,
      take: pageSize,
      orderBy: { created_at: "desc" },
    });

    const totalRecipes = await prisma.recipes.count({
      where: { author_id: id },
    });
    const totalPages = Math.ceil(totalRecipes / pageSize);

    return ApiResponse.paginated(
      `Successfully get ${userRecipe.length} recipe`,
      pageNumber,
      totalPages,
      userRecipe,
    );
  });
}
