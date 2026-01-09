import Image from "next/image";

export default function RecipeImage({
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
      priority={false}
      {...props}
    />
  );
}
