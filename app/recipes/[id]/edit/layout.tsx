import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function getAuthorizedStatus(recipeId: string) {
  const cookieStore = await cookies();
  const request = await fetch(
    `${process.env.BASE_URL}/api/recipes/${recipeId}/authorized`,
    {
      method: "POST",
      headers: {
        Cookie: cookieStore.toString(),
      },
      credentials: "include",
    },
  );
  const response = await request.json();
  const isAuthorized = response.data;
  return isAuthorized;
}

export default async function EditRecipeLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const isAuthorized = await getAuthorizedStatus(id);
  if (!isAuthorized) return redirect("/");
  return <div>{children}</div>;
}
