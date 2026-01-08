import { recipeSchema } from "@/zod/recipeSchema";
import { Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { HTMLAttributes } from "react";
import z from "zod";

export type RecipeCardProps = z.infer<typeof recipeSchema> & {
  author: { id: string; username: string; avatar: string };
  id: string;
};

export default function RecipeCard({
  image,
  title,
  description,
  serving,
  duration,
  author,
  id,
}: RecipeCardProps) {
  return (
    <Link
      href={`/recipes/${id}`}
      className="recipe-card flex w-full rounded-lg border bg-white overflow-hidden"
    >
      <RecipeImage image={image} title={title} />
      <section className="flex flex-col justify-between px-3 py-2 flex-1">
        <div className="h-2/5 md:h-1/2">
          <RecipeOverview title={title} description={description} />
        </div>
        <div className="h-1/6 md:h-1/5">
          <RecipeDurationAndServingDetail
            duration={duration}
            serving={serving}
          />
        </div>
        <div className="h-1/5 md:h-1/4">
          <RecipeAuthorBadge
            username={author.username}
            avatar={author.avatar}
          />
        </div>
      </section>
    </Link>
  );
}

function RecipeImage({
  title,
  image,
  ...props
}: { title: string; image: string } & Partial<
  React.ComponentProps<typeof Image>
>) {
  return (
    <Image
      src={image || "/logo-only-icon.svg"}
      alt={`${title} image` || "Recipe Image"}
      className={`object-cover h-full w-36 aspect-square bg-gray-200 ${props.className}`}
      width={1080}
      height={1080}
      {...props}
    />
  );
}

function RecipeOverview({
  title,
  description,
  size = "small",
}: {
  title: string;
  description: string | undefined;
  size?: "small" | "large";
}) {
  const titleVariants = {
    small: "text-lg md:text-xl",
    large: "text-xl md:text-2xl",
  };
  const descriptionVariants = {
    small: "text-xs md:text-sm",
    large: "text-sm md:text-base",
  };

  return (
    <div className="h-full w-full flex flex-col gap-2">
      <h1
        className={`${titleVariants[size]} font-semibold line-clamp-1 overflow-clip`}
      >
        {title}
      </h1>
      <section
        className={` ${descriptionVariants[size]} line-clamp-2 text-justify overflow-clip`}
      >
        {description ? (
          <p>{description}</p>
        ) : (
          <p className="text-gray-400 italic">Tidak ada deskripsi</p>
        )}
      </section>
    </div>
  );
}

function RecipeDurationAndServingDetail({
  duration,
  serving,
}: {
  duration: number;
  serving: number;
}) {
  const abouts = [
    {
      icon: Clock,
      value: `${duration / 60} Menit`,
    },
    {
      icon: User,
      value: `${serving} Orang`,
    },
  ];

  return (
    <div className="h-full w-full flex gap-3 md:gap-5">
      {abouts.map((about, index) => (
        <span
          className="flex gap-2 items-center text-xs lg:text-sm"
          key={index}
        >
          <about.icon size={18} />
          {about.value}
        </span>
      ))}
    </div>
  );
}

function RecipeAuthorBadge({
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

export {
  RecipeImage,
  RecipeAuthorBadge,
  RecipeOverview,
  RecipeDurationAndServingDetail,
};
