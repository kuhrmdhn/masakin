import RecipeForm from "@/components/elements/recipe/form/RecipeForm";
import { getRecipeCategoryLists } from "@/queries/getRecipeCategoryLists";
import { postRecipe } from "../../../actions/postRecipe";

export default async function NewRecipePage() {
  const recipeCategoryLists = await getRecipeCategoryLists();
  return (
    <RecipeForm 
    action={postRecipe}
    categoryLists={recipeCategoryLists}
    />
  );
}
