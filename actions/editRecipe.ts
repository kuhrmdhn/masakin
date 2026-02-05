"use server";
import { uploadRecipeImage } from "@/app/api/recipes/utils/uploadRecipeImage";
import { Recipe, RecipeIngredients, RecipeSteps } from "@/zod/recipeSchema";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { RecipeActionState } from "./types/FormAction";

export async function editRecipe(
  recipeId: string,
  initialRecipeData: Recipe,
  prevState: RecipeActionState,
  formData: FormData,
): Promise<RecipeActionState> {
  const filterFields = new FilterFields(formData);
  await filterFields.image();
  filterFields.baseInformation(initialRecipeData);
  await filterFields.utility(
    initialRecipeData.steps,
    initialRecipeData.ingredients,
  );
  const cookie = await cookies();
  const request = await fetch(
    `${process.env.BASE_URL}/api/recipes/${recipeId}`,
    {
      method: "PATCH",
      body: formData,
      credentials: "include",
      headers: {
        Cookie: cookie.toString(),
      },
    },
  );

  const response = await request.json();
  if (!request.ok) {
    return {
      success: false,
      message: response.message,
      data: null,
    };
  }
  const updatedRecipe = response.data as Recipe;

  revalidatePath("/");
  revalidatePath(`/recipes/${updatedRecipe.id}`);
  return {
    success: true,
    data: updatedRecipe,
    message: "Data resep diperbarui",
  };
}

class FilterFields {
  public formData: FormData;

  constructor(formData: FormData) {
    this.formData = formData;
  }

  async image() {
    const image = this.formData.get("image") as File;
    if (image.size <= 0) {
      this.formData.delete("image");
    } else {
      const { publicUrl } = await uploadRecipeImage(image);
      this.formData.set("image", publicUrl);
    }
  }

  baseInformation(initialRecipeData: Recipe) {
    const fieldKeys = [
      "title",
      "description",
      "duration",
      "serving",
      "category_id",
    ] as const;
    for (const key of fieldKeys) {
      const initialData = initialRecipeData[key];
      const rawNewData = this.formData.get(key);

      if (rawNewData === null) continue;

      if (typeof rawNewData === "string" && typeof initialData === "string") {
        const newValue = rawNewData.trim();
        const intialValue = initialData.trim();

        if (newValue === intialValue) {
          this.formData.delete(key);
        }

        continue;
      }

      if (typeof rawNewData === "string" && typeof initialData === "number") {
        const newValue =
          key === "duration" ? Number(rawNewData) * 60 : Number(rawNewData);
        if (newValue === initialData && !Number.isNaN(newValue)) {
          this.formData.delete(key);
        } else if (key === "duration") {
          this.formData.set(key, newValue.toString());
        }
      }
    }
  }

  async utility(
    initialSteps: Omit<RecipeSteps, "id">[],
    initialIngredients: Omit<RecipeIngredients, "id">[],
  ) {
    function filterChangedField<T extends object>(
      newData: Omit<T, "id">[],
      initialData: T[],
      formData: FormData,
      key: string,
    ) {
      const isSameLength = newData.length === initialData.length;

      const isSameValue =
        isSameLength &&
        initialData.every((oldField, i) => {
          const newField = newData[i];
          if (!newField) return false;

          return (Object.keys(newField) as (keyof typeof newField)[]).every(
            (k) => newField[k] === oldField[k],
          );
        });

      if (isSameValue) {
        formData.delete(key);
        return false;
      }

      formData.set(key, JSON.stringify(newData));
      return true;
    }

    const rawStepsValue = this.formData.getAll("steps");
    const stepsValue = rawStepsValue.map((step) => ({ step })) as RecipeSteps[];

    const rawQuantityValue = this.formData.getAll("quantity") as string[];
    const rawNameValue = this.formData.getAll("name") as string[];
    const ingredientsValue = rawQuantityValue.map((quantity, i) => ({
      quantity,
      name: rawNameValue[i],
    })) as RecipeIngredients[];

    this.formData.delete("name");
    this.formData.delete("quantity");

    filterChangedField(stepsValue, initialSteps, this.formData, "steps");

    filterChangedField(
      ingredientsValue,
      initialIngredients,
      this.formData,
      "ingredients",
    );
  }
}
