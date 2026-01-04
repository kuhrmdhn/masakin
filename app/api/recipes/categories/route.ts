import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { routeHandler } from "../../utils/routeHandler";
import { uploadNewRecipeCategory } from "./utils/uploadNewRecipeCategory";

export async function GET() {
  return routeHandler(async () => {
    const recipeCategories = await prisma.recipeCategories.findMany();
    return recipeCategories;
  });
}

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const { categoryName } = await req.json();
    const newCategory = await uploadNewRecipeCategory(categoryName)

    return newCategory;
  });
}
