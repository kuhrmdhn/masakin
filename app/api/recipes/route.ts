import { prisma } from "@/lib/prisma";
import { routeHandler } from "../utils/routeHandler";
import { NextRequest } from "next/server";
import { uploadNewRecipe } from "./utils/uploadNewRecipe";
import { readSession } from "../auth/utils/readSession";

export async function GET() {
  return routeHandler(async () => {
    const recipes = await prisma.recipes.findMany();
    return {
      message: `Success get ${recipes.length} recipe(s)`,
      data: recipes,
    };
  });
}

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const { id: author_id } = await readSession();
    const newRecipeData = await req.json();
    const newRecipe = await uploadNewRecipe({ author_id, ...newRecipeData });
    return {
      data: newRecipe,
      message: `Posted ${newRecipe.title} has been successfully`,
    };
  });
}
