import { getRecipeDetail } from "@/components/elements/recipe/details/RecipeDetails";
import EditRecipeForm from "@/components/elements/recipe/form/RecipeForm";
import { getRecipeCategoryLists } from "@/queries/getRecipeCategoryLists";
import { editRecipe } from "../../../../actions/editRecipe";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditRecipePage({ params }: Props) {
  const { id } = await params;
  const recipeData = await getRecipeDetail(id);
  const recipeCategoryList = await getRecipeCategoryLists();
  
  const action = editRecipe.bind(null, id, recipeData)
  return (
    <EditRecipeForm
      recipeData={recipeData}
      action={action}
      categoryLists={recipeCategoryList}
    />
  );
}
