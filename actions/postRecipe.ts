"use server";
import { uploadRecipeImage } from "@/app/api/recipes/utils/uploadRecipeImage";
import { Recipe } from "@/zod/recipeSchema";
import { cookies } from "next/headers";
import { RecipeActionState } from "./types/FormAction";

export async function postRecipe(prevState: RecipeActionState, formData: FormData): Promise<RecipeActionState> {
  const cookie = await cookies();
  const image = formData.get("image") as File;
  const { publicUrl } = await uploadRecipeImage(image);
  formData.set("image", publicUrl);

  const request = await fetch(`${process.env.BASE_URL}/api/recipes`, {
    method: "POST",
    body: formData,
    credentials: "include",
    headers: {
      Cookie: cookie.toString(),
    },
  });

  const response = await request.json();
  const newRecipe = response.data as Recipe;

  return { success: true, data: newRecipe, message: "Resep ditambahkan" }
}
