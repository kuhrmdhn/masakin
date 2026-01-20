import { User } from "@/zod/authSchema";
import Image from "next/image";

export default function AboutUser({
  username,
  avatar,
  bio,
}: Omit<User, "email" | "id">) {
  return (
    <div className="h-32 w-full flex gap-5 justify-center items-center">
      <section className="w-2/5 h-full flex justify-end">
        <Image
          className="rounded-full size-28"
          src={avatar || "/default-user-avatar.svg"}
          alt={`${username} avatar image`}
          height={1080}
          width={1080}
        />
      </section>
      <section className="h-full w-1/2 py-4 flex flex-col gap-2 text-justify text-sm">
        <h1 className="font-semibold text-lg">{username}</h1>
        {bio ? (
          <p className="line-clamp-3">{bio}</p>
        ) : (
          <p className="italic">Tidak ada bio</p>
        )}
      </section>
    </div>
  );
}
