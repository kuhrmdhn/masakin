import ApiResponse from "../../utils/apiResponse";
import { routeHandler } from "../../utils/routeHandler";
import { readSession } from "../utils/readSession";

export async function GET() {
  return routeHandler(async () => {
    const user = await readSession();
    if (!user) {
      return ApiResponse.unauthenticated();
    }
    return ApiResponse.success(`Active session for user : ${user?.id}`, user);
  });
}

