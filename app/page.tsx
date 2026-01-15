import RecipeListsContent from "@/components/elements/recipe/card/RecipeListsContent";
import RecipeListsSkeleton from "@/components/elements/recipe/card/RecipeListsSkeleton";
import { Suspense } from "react";

async function getAllRecipes(page: number = 1) {
  const request = await fetch(`${process.env.BASE_URL}/api/recipes?pageNumber=${page}`, { method: "GET", next: { revalidate: 60 } })
  const response = await request.json()
  return response.data
}

export default async function HomePage() {
  const initialData = await getAllRecipes();
  return (
    <div className="min-h-dvh w-full">
      <Suspense fallback={<RecipeListsSkeleton />}>
        <RecipeListsContent apiEndpoint="/api/recipes" initialData={initialData} />
      </Suspense>
    </div>
  );
}
