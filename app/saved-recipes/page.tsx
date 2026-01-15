import RecipeListsContent from "@/components/elements/recipe/card/RecipeListsContent";
import RecipeListsSkeleton from "@/components/elements/recipe/card/RecipeListsSkeleton";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function getUserSavedRecipes() {
  const cookieStore = await cookies();
  const request = await fetch(
    `${process.env.BASE_URL}/api/auth/user/saved-recipe/list`,
    {
      method: "GET",
      next: { revalidate: 60 },
      credentials: "include",
      headers: { Cookie: cookieStore.toString() },
    },
  );
  const response = await request.json();
  const savedRecipes = response.data;
  
  return savedRecipes;
}

export default async function UserSavedRecipesPage() {
  const savedRecipes = await getUserSavedRecipes();
  return (
    <div className="min-h-dvh w-full">
      <Suspense fallback={<RecipeListsSkeleton />}>
        <RecipeListsContent apiEndpoint="/api/auth/user/saved-recipe/list" initialData={savedRecipes}/>
      </Suspense>
    </div>
  );
}
