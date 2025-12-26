import { prisma } from "@/lib/prisma";
import { routeHandler } from "../utils/routeHandler";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

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
    const body = await req.json();
    return { data: body, id: uuidv4() };
  });
}
