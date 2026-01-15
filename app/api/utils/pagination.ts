import { NextRequest } from "next/server";

export function pagination(req: NextRequest) {
    const params = req.nextUrl.searchParams;

    const pageSizeParams = params.get("pageSize") || "10";
    const pageSize = parseInt(pageSizeParams); // max fetch item per page number, 10 by default

    const pageNumberParams = params.get("pageNumber") || "1";
    const pageNumber = parseInt(pageNumberParams);

    const skip = (pageNumber - 1) * pageSize;

    return { skip, pageSize, pageNumber }
}