"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RecipeCategories } from "@/generated/prisma/client";
import { useEffect, useState } from "react";

type Props = {
  defaultCategory?: string;
};

export default function CategoryInput({ defaultCategory }: Props) {
  const [categories, setCategories] = useState<RecipeCategories[]>([]);
  useEffect(() => {
    async function getCategories() {
      const request = await fetch("/api/recipes/categories", { method: "GET" });
      const response = await request.json();
      const categoryLists = response.data as RecipeCategories[];
      setCategories(categoryLists);
    }
    getCategories();
  }, []);
  return (
    <section className="mt-5">
      <p className="text-sm font-medium">Kategori</p>
      <Select value={defaultCategory || undefined} name="category_id">
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih kategori resep" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Kategori</SelectLabel>
            {categories?.map((category, index) => (
              <SelectItem
                key={category?.id || index}
                value={category?.id || ""}
              >
                {category?.name || "Unknown"}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </section>
  );
}
