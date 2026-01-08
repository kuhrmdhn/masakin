import { Recipe } from "@/zod/recipeSchema";
import {
  RecipeAuthorBadge,
  RecipeDurationAndServingDetail,
  RecipeImage,
  RecipeOverview,
} from "../card/RecipeCard";

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
  const recipeDetailData = await getRecipeDetail(recipeId);
  return (
    <div className="px-5 w-full">
      <section className="flex flex-col lg:flex-row gap-7 w-full lg:h-96">
        <div className="w-full lg:w-72 ">
          <RecipeImage
            className="w-full h-96 aspect-video rounded-lg"
            image={recipeDetailData.image}
            title={recipeDetailData.title}
          />
        </div>
        <div className="w-full lg:w-2/3 flex flex-col gap-3">
          <section className="h-1/4 w-full">
            <RecipeOverview
              size="large"
              title={recipeDetailData.title}
              description={recipeDetailData.description}
            />
          </section>
          <section className="h-10 w-fit">
            <RecipeDurationAndServingDetail
              duration={recipeDetailData.duration}
              serving={recipeDetailData.serving}
            />
          </section>
          <section className="h-10 w-fit">
            <RecipeAuthorBadge
              avatar={recipeDetailData.author.avatar}
              username={recipeDetailData.author.username}
            />
          </section>
        </div>
      </section>
      <section className="flex flex-col gap-5 lg:gap-0 lg:flex-row h-fit mt-5 lg:mt-10">
        <div className="w-full lg:w-1/3">
          <section className="sticky top-20">
            <h1 className="font-semibold text-xl mb-4">Bahan - bahan</h1>
            <ol className="flex flex-col gap-2">
              {recipeDetailData.ingredients.map((ingredient, index) => (
                <li key={index}>
                  <span className="font-semibold mr-2">
                    {ingredient.quantity}
                  </span>
                  {ingredient.name}
                </li>
              ))}
            </ol>
          </section>
        </div>
        <div className="w-full lg:w-2/3">
          <section className="sticky top-20">
            <h1 className="font-semibold text-xl mb-4">Langkah - langkah</h1>
            <ol className="flex flex-col gap-2">
              {recipeDetailData.steps.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  {" "}
                  <div className="shrink-0 size-8 rounded-full  bg-primary  flex  items-center justify-center text-xs text-white">
                    {index + 1}
                  </div>
                  <span className="flex-1">{step.step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>
      </section>
    </div>
  );
}
