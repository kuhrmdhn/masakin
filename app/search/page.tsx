import RecipeListsContent from "@/components/elements/recipe/card/RecipeListsContent";
import RecipeListsSkeleton from "@/components/elements/recipe/card/RecipeListsSkeleton";
import { getRecipeLists } from "@/queries/getRecipeLists";
import { Suspense } from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const q = params.q as string;
  const lists = await getRecipeLists(q);
  return (
    <div className="min-h-dvh w-full">
      <Suspense fallback={<RecipeListsSkeleton />}>
        <RecipeListsContent initialData={lists.data} apiEndpoint="/api/recipes" params={q} />
      </Suspense>
    </div>
  );
}
