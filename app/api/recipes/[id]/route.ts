import { NextRequest } from "next/server";
import { deleteRecipe } from "./utils/deleteRecipe";
import { routeHandler } from "../../utils/routeHandler";
import { updateRecipe } from "./utils/updateRecipe";
import { getRecipe } from "./utils/getRecipe";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return routeHandler(async () => {
    const { id } = await params;
    const recipe = await getRecipe(id);

    return { data: recipe, message: `Success get recipe: ${id}` };
  });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  return routeHandler(async () => {
    const { id } = await params;
    const { id: deletedRecipeId } = await deleteRecipe(id);
    return {
      message: `Deleted recipe: ${deletedRecipeId}`,
    };
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

    return {
      data: updatedRecipe,
      message: `Sucess updated recipe: ${updatedRecipe.id}`,
    };
  });
}
