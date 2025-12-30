export async function getRecipeLists(q?: string) {
  const queryString = q ? `?q=${encodeURIComponent(q)}` : "";
  const request = await fetch(
    `${process.env.BASE_URL}/api/recipes${queryString}`,
    {
      method: "GET",
    },
  );
  const response = await request.json();
  const { data } = response;
  return data;
}
