import { prisma } from "@/lib/prisma";
import { routeHandler } from "../utils/routeHandler";
import { NextRequest } from "next/server";
import { uploadNewRecipe } from "./utils/uploadNewRecipe";
import { readSession } from "../auth/utils/readSession";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const params = req.nextUrl.searchParams;

    // Search recipe params => q
    const searchKeyParams = params.get("q") || "";
    const decodedSearchKeyParams = decodeURIComponent(searchKeyParams);
    const q = decodedSearchKeyParams.trim();
    const haveQuery = q && q.length > 0;

    // Pagination recipe params => pageSize & pageNumber
    const pageSizeParams = params.get("pageSize") || "10";
    const pageSize = parseInt(pageSizeParams);
    const pageNumberParams = params.get("pageNumber") || "1";
    const pageNumber = parseInt(pageNumberParams);

    const skip = (pageNumber - 1) * pageSize;

    const searchQuery = haveQuery
      ? {
          OR: [
            {
              title: {
                contains: q,
                mode: "insensitive" as const,
              },
            },
            {
              ingredients: {
                some: {
                  name: {
                    contains: q,
                    mode: "insensitive" as const,
                  },
                },
              },
            },
          ],
        }
      : undefined;

    const recipes = await prisma.recipes.findMany({
      include: {
        author: { select: { id: true, username: true, avatar: true } },
        ingredients: { select: { name: true } },
      },
      where: searchQuery,
      skip: skip,
      take: pageSize,
      orderBy: {
        created_at: "desc",
      },
    });

    const totalRecipes = await prisma.recipes.count({
      where: searchQuery,
    });

    const totalPages = Math.ceil(totalRecipes / pageSize);
    const hasNextPage = pageNumber < totalPages;

    return {
      message: `Success get ${recipes.length} recipe(s)`,
      data: recipes,
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

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const { id: author_id } = await readSession();
    const newRecipeData = await req.json();
    const newRecipe = await uploadNewRecipe({
      author_id,
      ...newRecipeData,
    });
    return {
      data: newRecipe,
      message: `Posted ${newRecipe.title} has been successfully`,
    };
  });
}
