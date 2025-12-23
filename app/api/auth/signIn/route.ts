import { NextRequest } from "next/server";
import { routeHandler } from "../../utils/routeHandler";
import { signInUser } from "../utils/signInUser";

export async function POST(req: NextRequest) {
  return routeHandler(async () => {
    const body = await req.json();
    const { email, password } = body;

    const user = await signInUser({ email, password });

    return {
      message: "Sign in successfully",
      data: user,
    }
  })
}
