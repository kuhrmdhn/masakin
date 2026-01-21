import AboutUser from "@/components/elements/profile/AboutUser";
import RecipeListsContent from "@/components/elements/recipe/card/RecipeListsContent";
import RecipeListsSkeleton from "@/components/elements/recipe/card/RecipeListsSkeleton";
import { Metadata } from "next";
import { Suspense } from "react";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  const member = await getMemberProfile(username);
  return { title: `Profil ${member.username}` };
}

async function getMemberProfile(username: string) {
  const request = await fetch(
    `${process.env.BASE_URL}/api/member?username=${username}`,
    {
      next: { revalidate: 60 },
    },
  );
  const response = await request.json();
  const profile = response.data;
  return profile;
}

async function getMemberRecipe(username: string) {
  const request = await fetch(
    `${process.env.BASE_URL}/api/member/recipes?username=${username}`,
    {
      next: { revalidate: 60 },
    },
  );
  const response = await request.json();
  const recipe = response.data;
  return recipe;
}

export default async function MemberPage({ params }: Props) {
  const { username } = await params;
  const profile = await getMemberProfile(username);
  const recipe = await getMemberRecipe(username);
  return (
    <div className="flex flex-col gap-5">
      <AboutUser
        username={profile.username}
        bio={profile.bio}
        avatar={profile.avatar}
      />
      <section>
        <h1 className="text-lg font-semibold mb-3">Resep dari {username}</h1>
        <Suspense fallback={<RecipeListsSkeleton />}>
          <RecipeListsContent
            initialData={recipe}
            params={{ username }}
            apiEndpoint="/api/auth/user/recipe"
          />
        </Suspense>
      </section>
    </div>
  );
}
