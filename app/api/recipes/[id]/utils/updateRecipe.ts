import { readSession } from "@/app/api/auth/utils/readSession";
import { prisma } from "@/lib/prisma";
import { editRecipeSchema, type Recipe } from "@/zod/recipeSchema";
import z from "zod";

type RecipeFields = Omit<Partial<Recipe>, "author_id" | "id">;

function filterFields<T extends object>(obj: T) {
  const needParsedFieldKeys = new Set([
    "steps",
    "ingredients",
    "serving",
    "duration",
  ]);

  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => !key.startsWith("$ACTION"))
      .map(([key, value]) => {
        if (needParsedFieldKeys.has(key) && typeof value === "string") {
          try {
            return [key, JSON.parse(value)];
          } catch {
            return [key, value];
          }
        }
        return [key, value];
      }),
  );
}

export async function updateRecipe(fields: RecipeFields, recipeId: string) {
  const rawFields = filterFields(fields);
  const {
    data: decodedFieldsData,
    success,
    error: decodedFieldsError,
  } = editRecipeSchema.safeParse(rawFields);

  if (!success) {
    if (decodedFieldsError instanceof z.ZodError) {
      const errorMessages = decodedFieldsError.issues
        .map((e) => e.message)
        .join(". ");
      throw new Error(errorMessages);
    }
    throw new Error("Recipe schema validation error");
  }

  if(!decodedFieldsData) throw new Error("Tidak ada update")

  const { id: currentUserId } = await readSession();
  const isUserHaveUpdateAccess = await prisma.recipes.findUnique({
    where: {
      author_id: currentUserId,
      id: recipeId,
    },
  });

  if (!isUserHaveUpdateAccess) {
    throw new Error(
      "User not have access to update, because not an author this recipe",
    );
  }

  const { steps, ingredients, ...publicFields } = decodedFieldsData;

  if (steps && steps.length === 0) {
    console.log("step kosong");
    throw new Error("Steps tidak boleh kosong jika dikirim");
  }

  if (ingredients && ingredients.length === 0) {
    console.log("ingredient kosong");
    throw new Error("Ingredients tidak boleh kosong jika dikirim");
  }

  const isUpdateSteps = steps !== undefined;
  const isUpdateIngredients = ingredients !== undefined;
  const isUpdatePubFields = Object.keys(publicFields).length > 0;

  if (!isUpdateSteps && !isUpdateIngredients && !isUpdatePubFields) {
    throw new Error("Tidak ada field yang di-update");
  }

  const updatedRecipe = await prisma.$transaction(async (tx) => {
    if (isUpdateSteps) {
      await tx.steps.deleteMany({ where: { recipe_id: recipeId } });
      await tx.steps.createMany({
        data: steps.map((e) => ({ recipe_id: recipeId, ...e })),
      });
    }

    if (isUpdateIngredients) {
      await tx.ingredients.deleteMany({ where: { recipe_id: recipeId } });
      await tx.ingredients.createMany({
        data: ingredients.map((e) => ({ recipe_id: recipeId, ...e })),
      });
    }

    if (isUpdatePubFields) {
      await tx.recipes.update({
        where: { id: recipeId },
        data: publicFields,
      });
    }

    return tx.recipes.findUnique({
      where: { id: recipeId },
      include: {
        steps: true,
        ingredients: true,
        author: true,
      },
    });
  });

  return updatedRecipe;
}
