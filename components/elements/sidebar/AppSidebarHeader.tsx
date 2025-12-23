"use client";
import {
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import AppLogo from "./AppLogo";

export default function AppSidebarHeader() {
  const { open } = useSidebar();
  return (
    <SidebarHeader
      className={`flex items-center ${open ? "flex-row h-20" : "h-20 flex-col-reverse"}`}
    >
      <AppLogo className={open ? "h-1/2" : "h-full"} />
    </SidebarHeader>
  );
}
