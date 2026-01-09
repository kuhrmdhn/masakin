import { recipeSchema } from "@/zod/recipeSchema";
import Link from "next/link";
import z from "zod";
import RecipeImage from "./RecipeImage";
import RecipeOverview from "./RecipeOverview";
import RecipeDurationAndServingDetail from "./RecipeDurationAndServingDetail";
import RecipeAuthorBadge from "./RecipeAuthorBadge";

export type RecipeCardProps = z.infer<typeof recipeSchema> & {
  author: { id: string; username: string; avatar: string };
  id: string;
};

export default function RecipeCard({
  image,
  title,
  description,
  serving,
  duration,
  author,
  id,
}: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${id}`}
      className="recipe-card flex w-full rounded-lg border bg-white overflow-hidden"
    >
      <RecipeImage image={image} title={title} />
      <section className="flex flex-col justify-between px-3 py-2 flex-1">
        <div className="h-2/5 md:h-1/2">
          <RecipeOverview title={title} description={description} />
        </div>
        <div className="h-1/6 md:h-1/5">
          <RecipeDurationAndServingDetail
            duration={duration}
            serving={serving}
          />
        </div>
        <div className="h-1/5 md:h-1/4">
          <RecipeAuthorBadge
            username={author.username}
            avatar={author.avatar}
          />
        </div>
      </section>
    </Link>
  );
}
