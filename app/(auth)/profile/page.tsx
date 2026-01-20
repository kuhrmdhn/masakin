import AboutUser from "@/components/elements/profile/AboutUser";
import RecipeListsContent from "@/components/elements/recipe/card/RecipeListsContent";
import RecipeListsSkeleton from "@/components/elements/recipe/card/RecipeListsSkeleton";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { Suspense } from "react";

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Profil" };
}

async function getProfile() {
  const cookieStore = await cookies();
  const request = await fetch(`${process.env.BASE_URL}/api/auth/user/profile`, {
    next: { revalidate: 60 },
    credentials: "include",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  const response = await request.json();
  const profile = response.data;
  return profile;
}

async function getRecipe() {
  const cookieStore = await cookies();
  const request = await fetch(`${process.env.BASE_URL}/api/auth/user/recipe`, {
    next: { revalidate: 60 },
    credentials: "include",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  const response = await request.json();
  const recipe = response.data;
  return recipe;
}

export default async function ProfilePage() {
  const profile = await getProfile();
  const recipe = await getRecipe();
  return (
    <div className="flex flex-col gap-5">
      <AboutUser
        username={profile.username}
        bio={profile.bio}
        avatar={profile.avatar}
      />
      <section>
        <h1 className="text-lg font-semibold mb-3">Resep buatanmu</h1>
        <Suspense fallback={<RecipeListsSkeleton />}>
          <RecipeListsContent
            initialData={recipe}
            apiEndpoint="/api/auth/user/recipe"
          />
        </Suspense>
      </section>
    </div>
  );
}
