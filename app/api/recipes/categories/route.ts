import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";
import { routeHandler } from "../../utils/routeHandler";
import { uploadNewRecipeCategory } from "./utils/uploadNewRecipeCategory";
import ApiResponse from "../../utils/apiResponse";

export async function GET() {
  return routeHandler(async () => {
    const recipeCategories = await prisma.recipeCategories.findMany();
    return ApiResponse.success(
      `Successfully get ${recipeCategories.length} category`,
      recipeCategories
    );
  });
}

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const { categoryName } = await req.json();
    const newCategory = await uploadNewRecipeCategory(categoryName);

    return ApiResponse.success(`Successfully added new recipe category: ${newCategory.id}`)
  });
}
