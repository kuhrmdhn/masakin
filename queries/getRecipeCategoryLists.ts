import { RecipeCategories } from "@/generated/prisma/client";

export async function getRecipeCategoryLists() {
  const request = await fetch(
    `${process.env.BASE_URL || ""}/api/recipes/categories`,
    { method: "GET", next: { revalidate: 120 } },
  );
  const response = await request.json();
  const recipeCategories = response.data as RecipeCategories[];
  return recipeCategories;
}
