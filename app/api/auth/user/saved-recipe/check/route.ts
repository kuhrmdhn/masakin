import { routeHandler } from "@/app/api/utils/routeHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { readSession } from "../../../utils/readSession";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const { searchParams } = new URL(req.url);
    const recipeId = searchParams.get("recipeId");

    if (!recipeId) {
      return { error: "recipeId is required", data: false };
    }

    const { id: currentUserId } = await readSession();

    const isSavedByCurrentUser = await prisma.savedRecipes.findFirst({
      where: {
        user_id: currentUserId,
        recipe_id: recipeId,
      },
    });

    return { status: !!isSavedByCurrentUser };
  });
}
