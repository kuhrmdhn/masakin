"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import RecipeCard, { RecipeCardProps } from "./RecipeCard";
import { getRecipeLists } from "@/queries/getRecipeLists";

export default function RecipeLists({
  initialData,
  initialPage = 1,
  pageSize = 10,
  q = undefined,
}: {
  initialData: RecipeCardProps[];
  initialPage?: number;
  pageSize?: number;
  q?: string;
}) {
  const [recipeLists, setRecipeLists] =
    useState<RecipeCardProps[]>(initialData);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);
  const loaderTrigger = useRef<HTMLDivElement>(null);

  const loadMoreRecipes = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const nextPage = currentPage + 1;
      const response = await getRecipeLists(q, nextPage, pageSize);

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setRecipeLists((prev) => [...prev, ...response.data]);
        setCurrentPage(nextPage);

        if (response.pagination?.hasNextPage === false) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error("Failed to load more recipes:", error);
      setHasMore(false);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, hasMore, isLoading, pageSize]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting && hasMore && !isLoading) {
          loadMoreRecipes();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      },
    );

    const currentLoader = loaderTrigger.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [hasMore, isLoading, loadMoreRecipes]);

  useEffect(() => {
    setRecipeLists(initialData);
    setCurrentPage(initialPage);
    setHasMore(true);
  }, [initialData, initialPage]);

  return (
    <div>
      <section className="w-full grid grid-cols-2 gap-3 min-h-dvh">
        {recipeLists.map((list, index) => (
          <RecipeCard {...list} key={index} />
        ))}
      </section>

      {hasMore && (
        <div
          ref={loaderTrigger}
          className="h-20 w-full flex items-center justify-center"
        >
          <div className="text-gray-500">
            {isLoading ? "Loading more recipes..." : "Scroll for more"}
          </div>
        </div>
      )}

      {!hasMore && recipeLists.length > 0 && (
        <div className="h-20 w-full flex items-center justify-center">
          <div className="text-gray-500">No more recipes to load</div>
        </div>
      )}

      {recipeLists.length === 0 && (
        <div className="h-40 w-full flex items-center justify-center">
          <div className="text-gray-500">No recipes found</div>
        </div>
      )}
    </div>
  );
}
