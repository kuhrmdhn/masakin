import { prisma } from "@/lib/prisma";

export async function deleteRecipeCategory(id: string) {
    const deletedRecipeCategoryId = await prisma.recipeCategories.delete({
        where: {id: id},
        select: {id: true}
    })

    return deletedRecipeCategoryId
}