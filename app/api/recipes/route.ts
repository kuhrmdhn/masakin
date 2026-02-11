import { prisma } from "@/lib/prisma";
import { routeHandler } from "../utils/routeHandler";
import { NextRequest } from "next/server";
import { uploadNewRecipe } from "./utils/uploadNewRecipe";
import { readSession } from "../auth/utils/readSession";
import { revalidatePath } from "next/cache";
import { pagination } from "../utils/pagination";
import ApiResponse from "../utils/apiResponse";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const params = req.nextUrl.searchParams;

    // Search recipe params => q
    const searchKeyParams = params.get("q") || "";
    const decodedSearchKeyParams = decodeURIComponent(searchKeyParams);
    const q = decodedSearchKeyParams.trim();

    const searchCategoryKeyParams = params.get("category") || "";
    const decodedSearchCategoryKeyParams = decodeURIComponent(
      searchCategoryKeyParams,
    );
    const category = decodedSearchCategoryKeyParams.trim().toLowerCase();

    const haveQuery = (q && q.length > 0) || (category && category.length > 0);

    const { pageNumber, pageSize, skip } = pagination(req);

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
            {
              category_id: {
                contains: category,
                mode: "insensitive" as const,
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

    if (recipes.length < 1) {
      if (haveQuery) {
        return ApiResponse.notFound(`No search results found for: ${q}`);
      }
      return ApiResponse.notFound("Not found recipes");
    }

    const totalRecipes = await prisma.recipes.count({
      where: searchQuery,
    });

    const totalPages = Math.ceil(totalRecipes / pageSize);

    return ApiResponse.paginated(
      `Success get ${recipes.length} recipe(s)`,
      pageNumber,
      totalPages,
      recipes,
    );
  });
}

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const formData = await req.formData();
    const { id: author_id } = await readSession();
    const newRecipe = await uploadNewRecipe(formData, author_id);
    revalidatePath("/");

    return ApiResponse.success(`Posted new recipe: ${newRecipe.id}`, newRecipe);
  });
}
