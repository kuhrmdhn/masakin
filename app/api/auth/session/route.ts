import { routeHandler } from "../../utils/routeHandler";
import { readSession } from "../utils/readSession";

export async function GET() {
    return routeHandler(async () => {
        const user = await readSession()
        return { message: `Active session for user : ${user?.id}`, data: user }
    })
}