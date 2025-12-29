import RecipeLists from "@/components/elements/recipe/RecipeLists";

async function getRecipeLists() {
  const request = await fetch(`${process.env.BASE_URL}/api/recipes`, {
    method: "GET",
  });
  const response = await request.json();
  const { data } = response;
  return data;
}

export default async function Home() {
  const lists = await getRecipeLists();

  return (
    <div className="min-h-dvh w-full">
      <RecipeLists lists={lists} />
    </div>
  );
}
