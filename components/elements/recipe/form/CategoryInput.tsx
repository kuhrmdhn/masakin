import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { RecipeCategories } from "@/generated/prisma/client";

type Props = {
  defaultCategory?: string;
  categories: RecipeCategories[];
  className?: string;
};

export default function CategoryInput({
  defaultCategory,
  categories,
  className = "",
}: Props) {
  return (
    <section className={`mt-5 ${className}`}>
      <p className="text-sm font-medium">Kategori</p>
      <Select value={defaultCategory || undefined} name="category_id">
        <SelectTrigger className="w-full">
          <SelectValue className="h-12" placeholder="Pilih kategori resep" />
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
