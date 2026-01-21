import { prisma } from "@/lib/prisma";

export async function getRecipe(id: string) {
  const recipe = await prisma.recipes.findUnique({
    where: { id: id },
    include: {
      ingredients: true,
      steps: true,
      author: { select: { id: true, avatar: true, username: true } },
    },
  });

  return recipe;
}
