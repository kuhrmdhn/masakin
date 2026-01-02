import Image from "next/image";

export default function RecipeImage({
  src = "",
  alt = "",
  ...props
}: Partial<React.ComponentProps<typeof Image>>) {
  return (
    <Image
      width={1080}
      height={1080}
      src={src}
      alt={alt}
      className={`${props.className}`}
    />
  );
}
