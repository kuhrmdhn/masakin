import RecipeListsContent from "@/components/elements/recipe/card/RecipeListsContent";
import RecipeListsSkeleton from "@/components/elements/recipe/card/RecipeListsSkeleton";
import { getRecipeLists } from "@/queries/getRecipeLists";
import { Suspense } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function RecipeListByCategoryPage({ params }: Props) {
  const { id: category_id } = await params;
  const lists = await getRecipeLists(undefined, category_id);
  return (
    <div className="min-h-dvh w-full">
      <Suspense fallback={<RecipeListsSkeleton />}>
        <RecipeListsContent
          apiEndpoint={`${process.env.BASE_URL}/api/recipes`}
          params={{ category_id }}
          initialData={lists.data}
        />
      </Suspense>
    </div>
  );
}
