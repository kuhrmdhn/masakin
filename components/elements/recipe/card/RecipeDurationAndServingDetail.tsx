import { Clock, User } from "lucide-react";

export default function RecipeDurationAndServingDetail({
  duration,
  serving,
}: {
  duration: number;
  serving: number;
}) {
  const abouts = [
    {
      icon: Clock,
      value: `${Math.floor(duration / 60)} Menit`,
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
