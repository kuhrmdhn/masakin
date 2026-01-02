// queries/getRecipeLists.ts
export async function getRecipeLists(
  q?: string,
  pageNumber?: number,
  pageSize?: number,
) {
  const params = new URLSearchParams();

  if (q) params.append("q", q);
  if (pageNumber !== undefined)
    params.append("pageNumber", pageNumber.toString());
  if (pageSize !== undefined) params.append("pageSize", pageSize.toString());

  const queryString = params.toString();
  const url = `${process.env.BASE_URL || ""}/api/recipes${queryString ? `?${queryString}` : ""}`;

  try {
    const request = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!request.ok) {
      throw new Error(`HTTP error! status: ${request.status}`);
    }

    const response = await request.json();
    return response; // Return the entire response, not just data
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { data: [], pagination: { hasNextPage: false } };
  }
}
