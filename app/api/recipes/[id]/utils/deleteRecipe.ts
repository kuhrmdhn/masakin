import { readSession } from "@/app/api/auth/utils/readSession";
import { prisma } from "@/lib/prisma";

export async function deleteRecipe(id: string) {
  const { id: currentUserId } = await readSession();
  const deletedRecipeId = await prisma.recipes.delete({
    where: { id: id, author_id: currentUserId },
    select: { id: true },
  });

  return deletedRecipeId;
}
