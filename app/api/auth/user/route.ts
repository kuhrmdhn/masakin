// app/api/auth/user/route.ts atau pages/api/auth/user.ts
import { prisma } from "@/lib/prisma";
import { readSession } from "../utils/readSession";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const user = await readSession();

        if (!user) {
            return NextResponse.json({
                data: null,
                authenticated: false
            }, { status: 200 });
        }

        const userData = await prisma.users.findUnique({
            where: { id: user.id }
        });

        if (!userData) {
            return NextResponse.json({
                data: null,
                authenticated: false
            }, { status: 200 });
        }

        return NextResponse.json({
            data: userData,
            authenticated: true
        });

    } catch (error) {
        console.error("Error in /api/auth/user:", error);

        return NextResponse.json({
            data: null,
            authenticated: false,
            error: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}