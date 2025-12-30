import { prisma } from "@/lib/prisma";
import { routeHandler } from "../utils/routeHandler";
import { NextRequest } from "next/server";
import { uploadNewRecipe } from "./utils/uploadNewRecipe";
import { readSession } from "../auth/utils/readSession";

export async function GET(req: NextRequest) {
  return routeHandler(async () => {
    const params = req.nextUrl.searchParams.get("q") || "";
    const decodedParams = decodeURIComponent(params);
    const q = decodedParams.trim();
    const haveQuery = q && q.length > 0;

    const searchQuery = haveQuery
      ? {
          OR: [
            {
              title: {
                contains: q,
                mode: "insensitive" as const,
              },
            },
            {
              ingredients: {
                some: {
                  name: {
                    contains: q,
                    mode: "insensitive" as const,
                  },
                },
              },
            },
          ],
        }
      : undefined;

    const recipes = await prisma.recipes.findMany({
      include: {
        author: { select: { id: true, username: true, avatar: true } },
        ingredients: { select: { name: true } },
      },
      where: searchQuery,
    });

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
