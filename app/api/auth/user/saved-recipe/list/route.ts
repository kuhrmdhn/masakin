import { routeHandler } from "@/app/api/utils/routeHandler";
import { readSession } from "../../../utils/readSession";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { pagination } from "@/app/api/utils/pagination";
import { revalidatePath } from "next/cache";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const { id: userId } = await readSession();
    const { skip, pageSize } = pagination(req)

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
        created_at: "desc"
      }
    });
    const flattened = savedRecipesByUser.map((item) => ({
      id: item.recipe_id,
      ...item.Recipe,
    }));

    return { data: flattened };
  });
}

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const { recipeId } = await req.json();
    const { id: userId } = await readSession();
    const savedRecipe = await prisma.savedRecipes.create({
      data: { user_id: userId, recipe_id: recipeId },
    });

    revalidatePath("/saved-recipes")

    return { data: savedRecipe };
  });
}

export async function DELETE(req: NextRequest) {
  return routeHandler(async () => {
    const { recipeId } = await req.json();
    const { id: userId } = await readSession();
    const deletedSavedRecipe = await prisma.savedRecipes.deleteMany({
      where: { recipe_id: recipeId, user_id: userId },
    });

    return {
      data: false,
      success: deletedSavedRecipe.count > 0,
      deletedCount: deletedSavedRecipe.count,
    };
  });
}
