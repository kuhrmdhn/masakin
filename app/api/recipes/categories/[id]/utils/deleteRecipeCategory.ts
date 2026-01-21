import { prisma } from "@/lib/prisma";

export async function deleteRecipeCategory(id: string) {
  const deleteRecipeCategories = await prisma.recipeCategories.deleteMany({
    where: { id: id },
  });

  return deleteRecipeCategories;
}

