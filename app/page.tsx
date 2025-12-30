import RecipeLists from "@/components/elements/recipe/RecipeLists";
import { getRecipeLists } from "@/queries/getRecipeLists";

export default async function HomePage() {
  const lists = await getRecipeLists();
  return (
    <div className="min-h-dvh w-full">
      <RecipeLists lists={lists} />
    </div>
  );
}
