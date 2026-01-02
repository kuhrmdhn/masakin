import RecipeLists from "@/components/elements/recipe/card/RecipeLists";
import { getRecipeLists } from "@/queries/getRecipeLists";

export default async function HomePage() {
  const lists = await getRecipeLists(undefined, undefined, undefined);
  return (
    <div className="min-h-dvh w-full">
      <RecipeLists initialData={lists.data} />
    </div>
  );
}
