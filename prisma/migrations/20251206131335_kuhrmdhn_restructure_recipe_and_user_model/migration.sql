/*
  Warnings:

  - You are about to drop the column `category` on the `Recipes` table. All the data in the column will be lost.
  - You are about to drop the `_SavedRecipes` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `category_id` to the `Recipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "_SavedRecipes" DROP CONSTRAINT "_SavedRecipes_A_fkey";

-- DropForeignKey
ALTER TABLE "_SavedRecipes" DROP CONSTRAINT "_SavedRecipes_B_fkey";

-- AlterTable
ALTER TABLE "Recipes" DROP COLUMN "category",
ADD COLUMN     "category_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "_SavedRecipes";

-- DropEnum
DROP TYPE "RecipeCategories";

-- CreateTable
CREATE TABLE "SavedRecipes" (
    "id" SERIAL NOT NULL,
    "user_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,

    CONSTRAINT "SavedRecipes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RecipeCategories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "RecipeCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipes" ADD CONSTRAINT "Recipes_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "RecipeCategories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedRecipes" ADD CONSTRAINT "SavedRecipes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedRecipes" ADD CONSTRAINT "SavedRecipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
