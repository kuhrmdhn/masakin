import { Recipe } from "@/zod/recipeSchema"

export type RecipeActionState = {
    success: boolean,
    data: Recipe | null,
    message: string
}