import RecipeDetails, { getRecipeDetail } from "@/components/elements/recipe/details/RecipeDetails";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  const id = (await params).id

  const recipe = await getRecipeDetail(id)

  return {
    title: recipe.title,
    description: recipe.description,
    openGraph: {
      images: [{ url: recipe.image }]
    }
  }
}

export default async function RecipeDetailPage({ params }: Props) {
  const { id } = await params;

  return <RecipeDetails recipeId={id} />;
}
