import { Recipe } from "@/zod/recipeSchema";
import DetailContent from "./DetailContent";
import RecipeIngredientsAndSteps from "./RecipeIngredientsAndSteps";

type Props = {
  recipeId: string;
};

export async function getRecipeDetail(id: string) {
  const request = await fetch(`${process.env.BASE_URL}/api/recipes/${id}`);
  const response = await request.json();
  const { data: recipeData } = response;
  return recipeData as Recipe;
}

export default async function RecipeDetails({ recipeId }: Props) {
  const {
    author,
    duration,
    image,
    ingredients,
    serving,
    steps,
    title,
    description,
  } = await getRecipeDetail(recipeId);
  const detailContents = {
    author,
    description,
    duration,
    image,
    serving,
    title,
    id: recipeId,
  };
  return (
    <div className="w-full">
      <DetailContent {...detailContents} />
      <RecipeIngredientsAndSteps ingredients={ingredients} steps={steps} />
    </div>
  );
}
