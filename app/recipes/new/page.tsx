"use client";
import BasicInformationInput from "@/components/elements/recipe/form/BasicInformationInput";
import ImageInput from "@/components/elements/recipe/form/ImageInput";
import IngredientsInput from "@/components/elements/recipe/form/IngredientsInput";
import StepsInput from "@/components/elements/recipe/form/StepsInput";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/zod/recipeSchema";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function NewRecipePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const request = await fetch("/api/recipes", {
        method: "POST",
        body: formData,
      });

      const response = await request.json();
      const newRecipe = response.data as Recipe;
      console.log({ newRecipe, response });
      toast.success("Resep berhasil diunggah!");
      router.push(`/recipes/${newRecipe.id}`);
    } catch (err) {
      const error = err as string;
      toast.error(error || "Gagal mengunggah resep");
      console.error("Upload error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-7">
      <ImageInput />
      <BasicInformationInput />
      <IngredientsInput />
      <StepsInput />
      <Button className="w-fit" type="submit" disabled={loading}>
        Unggah Resep
        {loading && <Loader className="ml-2 animate-spin" />}
      </Button>
    </form>
  );
}
