import { User } from "@/zod/authSchema";
import RecipeAuthorBadge from "../card/RecipeAuthorBadge";
import RecipeDurationAndServingDetail from "../card/RecipeDurationAndServingDetail";
import RecipeImage from "../card/RecipeImage";
import RecipeOverview from "../card/RecipeOverview";
import SaveRecipeButton from "../card/SaveRecipeButton";
import ShareRecipeButton from "../card/ShareRecipeButton";

type Props = {
  image: string;
  title: string;
  description?: string;
  serving: number;
  duration: number;
  author: User;
  id: string;
};

export default function DetailContent({
  author,
  description,
  duration,
  image,
  id,
  serving,
  title,
}: Props) {
  return (
    <section className="flex flex-col lg:flex-row gap-7 w-full lg:h-96">
      <div className="w-full lg:w-72 ">
        <RecipeImage
          className="w-full h-96 aspect-video rounded-lg"
          image={image}
          title={title}
        />
      </div>
      <div className="w-full lg:w-2/3 flex flex-col gap-3">
        <section className="h-1/4 w-full">
          <RecipeOverview
            size="large"
            title={title}
            description={description}
          />
        </section>
        <section className="h-10 w-fit">
          <RecipeDurationAndServingDetail
            duration={duration}
            serving={serving}
          />
        </section>
        <section className="h-10 w-fit">
          <RecipeAuthorBadge
            avatar={author.avatar}
            username={author.username}
          />
        </section>
        <section className="flex gap-3">
          <ShareRecipeButton />
          <SaveRecipeButton recipeId={id} />
        </section>
      </div>
    </section>
  );
}
