import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookMarked, Home, Upload } from "lucide-react";
import { cookies } from "next/headers";
import ProfileIcon from "../auth/ProfileIcon";
import SignInForm from "../auth/SignInForm";
import SignUpForm from "../auth/SignUpForm";
import { SidebarMenuLink } from "./SidebarMenuLink";

export default function UserMenuGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <MainMenus />
          <AuthMenus />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function MainMenus() {
  const mainMenus = [
    { icon: Home, name: "Beranda", href: "/" },
    { icon: Upload, name: "Unggah Resep", href: "/recipes/new" },
    { icon: BookMarked, name: "Koleksi Resep", href: "/saved-recipes" },
  ];
  return (
    <>
      {mainMenus.map((menu, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuButton className="h-10">
            <SidebarMenuLink
              href={menu.href}
              icon={menu.icon}
              text={menu.name}
            />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
}

async function AuthMenus() {
  const cookieStore = await cookies();
  const request = await fetch(`${process.env.BASE_URL}/api/auth/session`, {
    credentials: "include",
    cache: "no-store",
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  const response = await request.json();
  const isAuthenticated = !!response.data;

  return (
    <>
      {isAuthenticated ? (
        <SidebarMenuItem>
          <SidebarMenuButton className="h-10 overflow-visible">
            <SidebarMenuLink href="/profile" text="Profil" icon={ProfileIcon} />
          </SidebarMenuButton>
        </SidebarMenuItem>
      ) : (
        <>
          <SignInForm />
          <SignUpForm />
        </>
      )}
    </>
  );
}
