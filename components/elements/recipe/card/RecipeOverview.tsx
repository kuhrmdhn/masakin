export default function RecipeOverview({
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
