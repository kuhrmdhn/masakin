import Link from "next/link";

type Props = {
  text: string;
  icon: React.ComponentType<{ className?: string }>;
};

function SidebarMenuLink({
  text,
  icon,
  ...props
}: React.ComponentProps<typeof Link> & Props) {
  return (
    <Link href={props.href}>
      <MenuTrigger text={text} icon={icon} />
    </Link>
  );
}

function MenuTrigger({ icon: Icon, text }: Props) {
  return (
    <div className="cursor-pointer flex gap-5 items-center">
      <span className="w-10">
        <Icon />
      </span>
      <h1 className="line-clamp-1">{text}</h1>
    </div>
  );
}

export { SidebarMenuLink, MenuTrigger };

