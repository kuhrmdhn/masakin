import { routeHandler } from "@/app/api/utils/routeHandler";
import { readSession } from "../../../utils/readSession";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { pagination } from "@/app/api/utils/pagination";
import { revalidatePath } from "next/cache";
import ApiResponse from "@/app/api/utils/apiResponse";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const { id: userId } = await readSession();
    const { skip, pageSize, pageNumber } = pagination(req);

    const savedRecipesByUser = await prisma.savedRecipes.findMany({
      where: { user_id: userId },
      select: {
        Recipe: {
          select: {
            title: true,
            description: true,
            author: true,
            image: true,
            serving: true,
            duration: true,
          },
        },
        recipe_id: true,
      },
      skip,
      take: pageSize,
      orderBy: {
        created_at: "desc",
      },
    });

    const totalSavedRecipes = await prisma.savedRecipes.count({
      where: { user_id: userId },
    });

    const totalPages = Math.ceil(totalSavedRecipes / pageSize);

    const savedRecipes = savedRecipesByUser.map((item) => ({
      id: item.recipe_id,
      ...item.Recipe,
    }));

    return ApiResponse.paginated(
      `Success get user saved recipes`,
      pageNumber,
      totalPages,
      savedRecipes,
    );
  });
}

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const { recipeId } = await req.json();
    const { id: userId } = await readSession();
    const savedRecipe = await prisma.savedRecipes.create({
      data: { user_id: userId, recipe_id: recipeId },
      select: { Recipe: true },
    });

    revalidatePath("/saved-recipes");

    return ApiResponse.success(
      `Added ${savedRecipe.Recipe.title} to user saved recipes`,
    );
  });
}

export async function DELETE(req: NextRequest) {
  return routeHandler(async () => {
    const { recipeId } = await req.json();
    const { id: userId } = await readSession();
    const deleteSavedRecipe = await prisma.savedRecipes.deleteMany({
      where: { recipe_id: recipeId, user_id: userId },
    });
    const deletedRecipes = deleteSavedRecipe.count;

    return ApiResponse.success(`Deleted ${deletedRecipes} user saved recipes`);
  });
}
