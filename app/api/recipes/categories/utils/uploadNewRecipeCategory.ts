import { prisma } from "@/lib/prisma";
import {v4 as uuidv4} from "uuid"

export async function uploadNewRecipeCategory(categoryName: string) {
    const newCategory = await prisma.recipeCategories.create({
      data: {
        id: uuidv4(),
        name: categoryName,
      },
    });

    return newCategory;
}