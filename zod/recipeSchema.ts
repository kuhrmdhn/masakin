import z from "zod";
import { User } from "./authSchema";

const rules = {
  title: {
    min: {
      count: 1,
      message: "Nama resep setidaknya memiliki 1 karakter",
    },
    max: {
      count: 100,
      message: "Nama resep maksimal adalah 100 karakter",
    },
  },
  description: {
    min: {
      count: 1,
      message: "Deskripsi minimal 1 karakter dan bersifat opsional",
    },
    max: {
      count: 250,
      message: "Deskripsi resep maksimal memiliki 250 karakter",
    },
  },
};

const recipeStepSchema = z.object({
  step: z.string(),
});

const recipeIngredientSchema = z.object({
  name: z.string(),
  quantity: z.string(),
});

const recipeSchema = z.object({
  title: z
    .string()
    .min(rules.title.min.count, rules.title.min.message)
    .max(rules.title.max.count, rules.title.max.message),
  description: z
    .string()
    .min(rules.description.min.count, rules.description.min.message)
    .max(rules.description.max.count, rules.description.max.message)
    .optional(),
  author_id: z.string(),
  duration: z.number(),
  serving: z.number(),
  category_id: z.string(),
  image: z.string(),
  steps: z
    .array(recipeStepSchema)
    .min(1, "Resep setidaknya memiliki 1 langkah pembuatan"),
  ingredients: z
    .array(recipeIngredientSchema)
    .min(1, "Resep setidaknya memiliki 1 bahan"),
});

export type Recipe = z.infer<typeof recipeSchema> & {
  id: string;
  author: User;
  ingredients: { quantity: string; name: string }[];
  steps: { step: string }[];
};

export { recipeSchema, recipeStepSchema, recipeIngredientSchema };
