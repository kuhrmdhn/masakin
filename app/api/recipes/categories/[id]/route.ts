import { routeHandler } from "@/app/api/utils/routeHandler";
import { NextRequest } from "next/server";
import { deleteRecipeCategory } from "./utils/deleteRecipeCategory";
import { updateRecipeCategoryName } from "./utils/updateRecipeCategoryName";
import ApiResponse from "@/app/api/utils/apiResponse";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return routeHandler(async () => {
    const { id } = await params;
    const { newCategoryName } = await req.json();
    const updatedRecipeCategory = await updateRecipeCategoryName(
      id,
      newCategoryName,
    );

    return ApiResponse.success(`Updated recipe: ${id}`, updatedRecipeCategory);
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return routeHandler(async () => {
    const { id } = await params;
    const deleteRecipeCategories = await deleteRecipeCategory(id);
    const deletedCategories = deleteRecipeCategories.count;
    return ApiResponse.success(`Deleted ${deletedCategories} recipe category`);
  });
}
