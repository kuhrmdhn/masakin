import Image from "next/image";
import { cookies } from "next/headers";

async function getUserData() {
  try {
    const cookieStore = await cookies();

    const request = await fetch(
      `${process.env.BASE_URL}/api/auth/user/profile`,
      {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

    return await request.json();
  } catch (error) {
    console.error("Error in getUserData:", error);
    return { data: null, authenticated: false };
  }
}

type Props = React.ComponentProps<typeof Image>;

export default async function ProfileIcon({ ...props }: Partial<Props>) {
  const response = await getUserData();
  const userData = response.data;

  return (
    <Image
      width={1080}
      height={1080}
      src={userData?.avatar || "/default-user-avatar.svg"}
      alt={
        userData?.username ? `${userData.username} Avatar` : "Default Avatar"
      }
      className={`rounded-full w-8 object-cover object-center aspect-square ${props.className}`}
    />
  );
}

