import { readSession } from "@/app/api/auth/utils/readSession";
import { prisma } from "@/lib/prisma";
import { recipeSchema, type Recipe } from "@/zod/recipeSchema";
import z from "zod";

type RecipeFields = Omit<Partial<Recipe>, "author_id" | "id">;

function filterFields<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([q, v]) => v !== undefined),
  );
}

export async function updateRecipe(fields: RecipeFields, recipeId: string) {
  const {
    data: decodedFieldsData,
    success,
    error: decodedFieldsError,
  } = recipeSchema
    .partial()
    .extend({
      id: z.uuidv4("Recipe id is required for update action"),
    })
    .safeParse({ id: recipeId, ...fields });

  if (!success) {
    if (decodedFieldsError instanceof z.ZodError) {
      const errorMessages = decodedFieldsError.issues
        .map((e) => e.message)
        .join(". ");
      throw new Error(errorMessages);
    }
    throw new Error("Recipe schema validation error");
  }

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

  const { id, author_id, ...publicFields } = decodedFieldsData;
  const fieldsToUpdate = filterFields(publicFields);
  const updateRecipeData = await prisma.recipes.update({
    where: { id: id },
    data: fieldsToUpdate,
  });

  const { author_id: recipeAuthorId, ...updatedRecipeData } = updateRecipeData;

  return updatedRecipeData;
}
