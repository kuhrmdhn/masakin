import { recipeSchema } from "@/zod/recipeSchema";
import { Clock, User } from "lucide-react";
import Image from "next/image";
import React from "react";
import z from "zod";

export type RecipeCardProps = Omit<
  z.infer<typeof recipeSchema>,
  "description"
> & {
  author: { id: string; username: string; avatar: string };
  ingredients: { name: string };
};

export default function RecipeCard({
  image,
  title,
  ingredients,
  serving,
  duration,
  author,
}: RecipeCardProps) {
  return (
    <div className="recipe-card flex w-full rounded-lg border bg-white overflow-hidden">
      <CardImage src={image} alt={`${title} image`} />
      <section className="flex flex-col justify-between px-3 py-2 flex-1">
        <RecipeOverview title={title} ingredients={ingredients} />
        <AboutRecipe duration={duration} serving={serving} />
        <AuthorDetail username={author.username} avatar={author.avatar} />
      </section>
    </div>
  );
}

function CardImage({
  alt,
  src,
  ...props
}: Partial<React.ComponentProps<typeof Image>>) {
  return (
    <div className="relative w-36 aspect-square bg-gray-200">
      <Image
        src={src || "/logo-only-icon.svg"}
        alt={alt || "Recipe Image"}
        fill
        sizes="144px"
        className={`object-cover ${props.className}`}
        {...props}
      />
    </div>
  );
}

function RecipeOverview({
  title,
  ingredients,
}: {
  title: string;
  ingredients: { name: string }[];
}) {
  return (
    <div className="h-2/5 md:h-1/2 flex flex-col gap-2">
      <h1 className="text-lg md:text-xl font-semibold line-clamp-1 overflow-clip">
        {title}
      </h1>
      <section className="line-clamp-2 text-justify overflow-clip text-xs md:text-sm">
        {ingredients.map((e) => e.name).join(", ")}
      </section>
    </div>
  );
}

function AboutRecipe({
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
    <div className="h-1/6 md:h-1/5 flex gap-3 md:gap-5">
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

function AuthorDetail({
  avatar,
  username,
}: {
  avatar: string;
  username: string;
}) {
  return (
    <div className="h-1/5 md:h-1/4 flex gap-2 items-center">
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
