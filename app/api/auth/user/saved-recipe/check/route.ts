import { routeHandler } from "@/app/api/utils/routeHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { readSession } from "../../../utils/readSession";
import ApiResponse from "@/app/api/utils/apiResponse";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const { searchParams } = new URL(req.url);
    const recipeId = searchParams.get("recipeId");

    if (!recipeId) {
      return ApiResponse.validationError("Required recipeId search params");
    }

    const { id: currentUserId } = await readSession();

    const isSavedByCurrentUser = await prisma.savedRecipes.findFirst({
      where: {
        user_id: currentUserId,
        recipe_id: recipeId,
      },
    });

    const status = !!isSavedByCurrentUser;

    return ApiResponse.success(
      `${recipeId} is ${status ? "saved" : "not saved"} by user: ${currentUserId}`,
      { status },
    );
  });
}
