import RecipeLists from "@/components/elements/recipe/card/RecipeLists";
import { getRecipeLists } from "@/queries/getRecipeLists";

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
      <RecipeLists initialData={lists.data} q={q} />
    </div>
  );
}
