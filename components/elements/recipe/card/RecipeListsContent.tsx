"use client";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { useCallback, useEffect, useState } from "react";
import RecipeCard, { RecipeCardProps } from "./RecipeCard";

export default function RecipeListsContent({
  apiEndpoint,
  params,
  initialData = [],
  initialPage = 1
}: {
  apiEndpoint: string
  params?: string | string[][] | Record<string, string> | URLSearchParams | undefined;
  initialPage?: number
  initialData?: RecipeCardProps[];
}) {
  const [recipeLists, setRecipeLists] = useState<RecipeCardProps[]>(initialData);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isLoading, setIsLoading] = useState(false);

  const loadMoreRecipes = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const buildUrl = (page: number) => {
        const searchParams = new URLSearchParams();
        searchParams.set("pageNumber", String(page));

        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== "") {
              searchParams.set(key, String(value));
            }
          });
        }

        return `${apiEndpoint}?${searchParams.toString()}`;
      };

      const nextPage = currentPage + 1;
      const request = await fetch(buildUrl(nextPage), {});
      const response = await request.json()
      
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
  }, [currentPage, hasMore, isLoading, apiEndpoint, params]);

  const { loaderTriggerComponent } = useInfiniteScroll(loadMoreRecipes, hasMore && !isLoading)

  useEffect(() => {
    setRecipeLists(initialData);
    setCurrentPage(initialPage);
    setHasMore(true);
  }, [initialData, initialPage]);

  return (
    <>
      <section className="recipe-lists-container">
        {recipeLists.map((list, index) => (
          <RecipeCard {...list} key={index} />
        ))}
      </section>

      {hasMore && (
        <div
          ref={loaderTriggerComponent}
          className="h-20 w-full flex items-center justify-center"
        >
          <div className="text-gray-500">
            {isLoading
              ? "Memuat resep lainnya..."
              : "Gulir untuk melihat resep selanjutnya"}
          </div>
        </div>
      )}

      {!hasMore && recipeLists.length > 0 && (
        <div className="h-20 w-full flex items-center justify-center">
          <div className="text-gray-500">Tidak ada resep lagi untuk dimuat</div>
        </div>
      )}

      {recipeLists.length === 0 && (
        <div className="h-40 w-full flex items-center justify-center">
          <div className="text-gray-500">Tidak ada resep ditemukan</div>
        </div>
      )}
    </>
  );
}
