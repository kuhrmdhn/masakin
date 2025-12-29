import RecipeCard, { RecipeCardProps } from "./RecipeCard";

export default function RecipeLists({ lists }: { lists: RecipeCardProps[] }) {
  return (
    <div className="w-full h-fit px-3 grid gap-3 lg:grid-cols-2 md:align-items-center">
      {lists.map((list, index) => (
        <RecipeCard {...list} key={index} />
      ))}
    </div>
  );
}
