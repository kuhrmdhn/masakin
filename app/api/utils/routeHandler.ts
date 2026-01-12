import { NextResponse } from "next/server";

export async function routeHandler<T>(callback: () => Promise<T>) {
    try {
        const response = await callback()
        return NextResponse.json(response)
    } catch (err) {
        const error = err as Error
        console.error(error);
        return NextResponse.json({
            data: null,
            error: error.message ?? "Internal Server Error"
        }, { status: 500 })
    }
}