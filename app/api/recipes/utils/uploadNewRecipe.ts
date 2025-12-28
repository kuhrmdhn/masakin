import { prisma } from "@/lib/prisma";
import { recipeSchema } from "@/zod/recipeSchema";
import z from "zod";
import { v4 as uuidv4 } from "uuid";

type Recipe = z.infer<typeof recipeSchema>;

export async function uploadNewRecipe(newRecipeData: Recipe) {
  const {
    data: decodedData,
    success,
    error: decodedError,
  } = recipeSchema.safeParse(newRecipeData);

  if (!success) {
    if (decodedError instanceof z.ZodError) {
      const errorMessages = decodedError.issues
        .map((e) => e.message)
        .join(". ");
      throw new Error(errorMessages);
    }
    throw new Error("Schema validation error");
  }
  const { steps, ingredients, ...recipeData } = decodedData;
  const newRecipe = await prisma.recipes.create({
    data: {
      id: uuidv4(),
      steps: {
        create: steps,
      },
      ingredients: {
        create: ingredients,
      },
      ...recipeData,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      steps: true,
      ingredients: true,
      recipeCategories: true,
    },
  });

  return newRecipe;
}
