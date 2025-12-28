import Image from "next/image";
import React from "react";

export default function RecipeCard() {
  return (
    <div>
      <CardImage />
    </div>
  );
}

function CardImage({ ...props }: Partial<React.ComponentProps<typeof Image>>) {
  return (
    <Image
      width={1080}
      height={1080}
      alt={props.alt || "Recipe Image"}
      src={props.src || "/logo-only-icon.svg"}
      className={`size-20 ${props.className}`}
    />
  );
}
