import { readSession } from "@/app/api/auth/utils/readSession";
import ApiResponse from "@/app/api/utils/apiResponse";
import { routeHandler } from "@/app/api/utils/routeHandler";
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    return routeHandler(async () => {
        const { id: recipeId } = await params
        const { id: userId } = await readSession()
        const isRecipeAuthor = await prisma.recipes.findUnique({
            where: {
                author_id: userId,
                id: recipeId
            }
        })

        const isAuthorized = !!isRecipeAuthor
        
        if (!isAuthorized) {
            return ApiResponse.unauthorized()
        }

        return ApiResponse.success("Authorized confirmed", isAuthorized)
    })
}