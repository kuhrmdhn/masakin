"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeIngredients } from "@/zod/recipeSchema";
import { Carrot, Plus, Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

type Props = {
  defaultIngredientsValue?: RecipeIngredients[];
};

export default function IngredientsInput({
  defaultIngredientsValue = [{ id: uuidv4(), name: "", quantity: "" }],
}: Props) {
  const [ingredients, setIngredients] = useState<RecipeIngredients[]>(
    defaultIngredientsValue,
  );
  function addIngredient() {
    setIngredients((prev) => [
      ...prev,
      { id: uuidv4(), name: "", quantity: "" },
    ]);
  }

  function deleteIngredient(targetId: string) {
    if (ingredients.length <= 1) {
      return toast.warning(
        "Tidak bisa menghapus, resep setidaknya memiliki 1 bahan",
      );
    }
    setIngredients((prev) => prev.filter((e) => e.id !== targetId));
  }
  return (
    <div>
      <h1 className="recipe-form-section-heading">
        <Carrot /> Bahan - bahan
      </h1>
      <section className="flex flex-col gap-3">
        {ingredients.map((ingredient) => (
          <div key={ingredient.id} className="flex items-center gap-3">
            <section className="grid grid-cols-4 w-full">
              <div className="col-span-1">
                <Input
                  className="rounded-r-none border-r-0"
                  name="quantity"
                  defaultValue={ingredient.quantity}
                  placeholder="Contoh: 1 Piring"
                />
              </div>

              <div className="col-span-3">
                <Input
                  className="rounded-l-none"
                  name="name"
                  defaultValue={ingredient.name}
                  placeholder="Contoh: Nasi putih dingin"
                />
              </div>
            </section>
            <Button
              variant="destructive"
              type="button"
              size="icon"
              className="size-12"
              onClick={() => deleteIngredient(ingredient.id)}
            >
              <Trash />
            </Button>
          </div>
        ))}
      </section>
      <Button
        variant="outline"
        className="mt-3"
        type="button"
        onClick={() => addIngredient()}
      >
        <Plus className="mr-2" />
        Tambah Bahan
      </Button>
    </div>
  );
}
