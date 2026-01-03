import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  skeletonCount?: number;
};

export default function RecipeListsSkeleton({ skeletonCount = 10 }: Props) {
  return (
    <section className="recipe-lists-container">
      {[...Array(skeletonCount)].map((e, index) => (
        <Skeleton className="recipe-card" key={index} />
      ))}
    </section>
  );
}
