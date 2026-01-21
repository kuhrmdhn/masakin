import { NextRequest } from "next/server";
import { routeHandler } from "../../utils/routeHandler";
import { signInUser } from "../utils/signInUser";
import ApiResponse from "../../utils/apiResponse";

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const body = await req.json();
    const { email, password } = body;

    const user = await signInUser({ email, password });

    if (!user) {
      return ApiResponse.unauthenticated();
    }

    return ApiResponse.success("Sign in successfully", user);
  });
}
