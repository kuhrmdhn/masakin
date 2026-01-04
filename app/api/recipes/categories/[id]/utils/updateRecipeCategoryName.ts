import { prisma } from "@/lib/prisma";

export async function updateRecipeCategoryName(id: string, newCategoryName: string) {
    const updatedRecipeCategory = await prisma.recipeCategories.update({
        data: { name: newCategoryName },
        where: { id: id },
    });

    return updatedRecipeCategory;
}