export async function getRecipeLists(
  q?: string,
  category_id?: string,
  pageNumber?: number,
  pageSize?: number,
) {
  const params = new URLSearchParams();

  if (q) params.append("q", q);
  if (category_id) params.append("category_id", category_id);
  if (pageNumber !== undefined)
    params.append("pageNumber", pageNumber.toString());
  if (pageSize !== undefined) params.append("pageSize", pageSize.toString());

  const queryString = params.toString();
  const url = `${process.env.BASE_URL || ""}/api/recipes${queryString ? `?${queryString}` : ""}`;

  try {
    const request = await fetch(url, {
      method: "GET",
      next: { revalidate: 60 },
    });

    const response = await request.json();
    return response;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return { data: [], pagination: { hasNextPage: false } };
  }
}
