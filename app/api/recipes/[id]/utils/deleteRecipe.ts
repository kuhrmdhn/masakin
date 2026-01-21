import { readSession } from "@/app/api/auth/utils/readSession";
import { prisma } from "@/lib/prisma";

export async function deleteRecipe(id: string) {
  const { id: currentUserId } = await readSession();
  const deletedRecipes = await prisma.recipes.deleteMany({
    where: { id: id, author_id: currentUserId },
  });

  return deletedRecipes;
}
