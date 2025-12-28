-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_recipe_id_fkey";

-- DropForeignKey
ALTER TABLE "SavedRecipes" DROP CONSTRAINT "SavedRecipes_recipe_id_fkey";

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedRecipes" ADD CONSTRAINT "SavedRecipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
