"use client";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  recipeId: string;
};

export default function SaveRecipeButton({ recipeId }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSavedRecipe, setIsSavedRecipe] = useState(false);

  async function handleSaveRecipe() {
    setIsLoading(true);
    try {
      const request = await fetch("/api/auth/user/saved-recipe/list", {
        method: isSavedRecipe ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ recipeId: recipeId }),
      });
      const response = await request.json();

      setIsSavedRecipe(response.data);
    } catch (error) {
      console.error("Error saving recipe:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    async function checkBookmarkStatus() {
      try {
        const request = await fetch(
          `/api/auth/user/saved-recipe/check?recipeId=${recipeId}`,
        );
        const response = await request.json();

        setIsSavedRecipe(response.data.status);
      } catch (error) {
        console.error("Error checking bookmark status:", error);
      }
    }

    checkBookmarkStatus();
  }, [recipeId]);
  return (
    <Button
      onClick={() => handleSaveRecipe()}
      disabled={isLoading}
      variant={isSavedRecipe ? "default" : "outline"}
      className="[&_svg]:size-5!"
    >
      {isSavedRecipe ? <Bookmark fill="#fff" /> : <Bookmark />}
      {isSavedRecipe ? "Disimpan" : "Simpan"}
    </Button>
  );
}
