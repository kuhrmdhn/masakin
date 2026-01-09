import RecipeListsContent from "@/components/elements/recipe/card/RecipeListsContent";
import RecipeListsSkeleton from "@/components/elements/recipe/card/RecipeListsSkeleton";
import { getRecipeLists } from "@/queries/getRecipeLists";
import { Suspense } from "react";

export default async function HomePage() {
  const lists = await getRecipeLists();
  return (
    <div className="min-h-dvh w-full">
      <Suspense fallback={<RecipeListsSkeleton />}>
        <RecipeListsContent initialData={lists.data} />
      </Suspense>
    </div>
  );
}
