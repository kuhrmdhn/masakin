import { prisma } from "@/lib/prisma";
import { recipeSchema } from "@/zod/recipeSchema";
import z from "zod";
import { v4 as uuidv4 } from "uuid";

export async function uploadNewRecipe(formData: FormData, author_id: string) {
  const title = formData.get("title") as string;
  const serving = parseInt(formData.get("serving") as string);
  const duration = parseInt(formData.get("duration") as string) * 60;
  const category_id = formData.get("category_id") as string;
  const image = formData.get("image") as string;

  const rawDescriptionValue = formData.get("description") as string;
  const description =
    rawDescriptionValue.length === 0 ? undefined : rawDescriptionValue;

  const rawStepsValue = formData.getAll("steps") as string[];
  const stepsValue = rawStepsValue.map((step) => ({ step }));

  const rawNameValue = formData.getAll("name") as string[];
  const rawQuantityValue = formData.getAll("quantity") as string[];
  const ingredientsValue = rawQuantityValue.map((quantity, i) => ({
    quantity,
    name: rawNameValue[i],
  }));

  const newRecipeData = {
    title,
    description,
    duration,
    serving,
    category_id,
    author_id,
    image,
    steps: stepsValue,
    ingredients: ingredientsValue,
  };

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
