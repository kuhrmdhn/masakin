import { routeHandler } from "@/app/api/utils/routeHandler";
import { readSession } from "../../../utils/readSession";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function GET() {
  return routeHandler(async () => {
    const { id: userId } = await readSession();
    const savedRecipesByUser = await prisma.savedRecipes.findMany({
      where: { user_id: userId },
    });
    return { data: savedRecipesByUser };
  });
}

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const { recipeId } = await req.json();
    const { id: userId } = await readSession();
    const savedRecipe = await prisma.savedRecipes.create({
      data: { user_id: userId, recipe_id: recipeId },
    });

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
