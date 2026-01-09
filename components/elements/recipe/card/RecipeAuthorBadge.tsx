import Image from "next/image";

export default function RecipeAuthorBadge({
  avatar = "/default-user-avatar.svg",
  username,
}: {
  avatar?: string;
  username: string;
}) {
  return (
    <div className="h-full w-full flex gap-2 items-center">
      <Image
        src={avatar}
        alt={`${username} avatar`}
        width={1080}
        height={1080}
        className="size-7 md:size-8 rounded-full"
      />
      <p className="text-xs md:text-sm">{username}</p>
    </div>
  );
}
