import ApiResponse from "./apiResponse";

export async function routeHandler<T>(callback: () => Promise<T>) {
    try {
        const response = await callback()
        return response
    } catch (err) {
        const error = err as Error
        console.error(error);
        return ApiResponse.serverError()
    }
}