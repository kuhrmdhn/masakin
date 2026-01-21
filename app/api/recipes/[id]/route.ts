import { NextRequest } from "next/server";
import { deleteRecipe } from "./utils/deleteRecipe";
import { routeHandler } from "../../utils/routeHandler";
import { updateRecipe } from "./utils/updateRecipe";
import { getRecipe } from "./utils/getRecipe";
import ApiResponse from "../../utils/apiResponse";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return routeHandler(async () => {
    const { id } = await params;
    const recipe = await getRecipe(id);

    if (!recipe) {
      return ApiResponse.notFound(`Not found recipe with id: ${id}`)
    }

    return ApiResponse.success(`Success get recipe: ${id}`, recipe);
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return routeHandler(async () => {
    const { id } = await params;
    const deleteRecipes = await deleteRecipe(id);
    const deletedRecipes = deleteRecipes.count

    if (deletedRecipes < 1) {
      return ApiResponse.error("Nothing recipes deleted", 400)
    }

    return ApiResponse.success(`Deleted ${deletedRecipes} recipes`)
  });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return routeHandler(async () => {
    const recipeFieldToUpdate = await req.json();
    const { id } = await params;
    const updatedRecipe = await updateRecipe(recipeFieldToUpdate, id);

    return ApiResponse.success(
      `Sucess updated recipe: ${updatedRecipe.id}`,
      updatedRecipe,
    );
  });
}
