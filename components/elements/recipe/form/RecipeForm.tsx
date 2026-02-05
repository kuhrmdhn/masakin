"use client";
import { Button } from "@/components/ui/button";
import StepsInput from "./StepsInput";
import IngredientsInput from "./IngredientsInput";
import BasicInformationInput from "./BasicInformationInput";
import ImageInput from "./ImageInput";
import { Recipe, RecipeIngredients, RecipeSteps } from "@/zod/recipeSchema";
import { RecipeCategories } from "@/generated/prisma/client";
import CategoryInput from "./CategoryInput";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { RecipeActionState } from "@/actions/types/FormAction";
import { useRouter } from "next/navigation";

type Props = {
  recipeData?: Recipe;
  categoryLists: RecipeCategories[];
  action: (prevState: RecipeActionState, formData: FormData) => Promise<RecipeActionState>
};

export default function RecipeForm({ recipeData, categoryLists, action }: Props) {
  const {
    title = "",
    description = "",
    image = "",
    category_id = "",
    duration = 60,
    serving = 1,
    ingredients = [],
    steps = [],
  } = recipeData || {};

  const { push } = useRouter()
  const [state, formAction, isPending] = useActionState(action, {
    success: false,
    data: null,
    message: ""
  });

  useEffect(() => {
    if (!isPending) {
      if (state.success && state.data) {
        const recipeData = state.data
        toast.success(state.message);
        push(`/recipes/${recipeData.id}`)
      } else {
        toast.warning(state.message)
      }
    }
  }, [isPending, state]);
  return (
    <form action={formAction}>
      <ImageInput initialImage={image} altText={`${title} Image`} />
      <BasicInformationInput
        initialData={{ title, duration, description, serving }}
      />
      <CategoryInput categories={categoryLists} defaultCategory={category_id} />
      <IngredientsInput
        defaultIngredientsValue={ingredients as RecipeIngredients[]}
      />
      <StepsInput defaultStepsValue={steps as RecipeSteps[]} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
