import ApiResponse from "./apiResponse";

export async function routeHandler<T>(callback: () => Promise<T>) {
  try {
    const response = await callback();
    return response;
  } catch (err) {
    const error = err as Error;
    console.error({ error: error.message });
    return ApiResponse.error(error.message, 422);
  }
}

