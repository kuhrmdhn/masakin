import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import RecipeCategoryGroup from "./RecipeCategoryGroup";
import UserMenuGroup from "./UserMenuGroup";

export default function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <AppSidebarHeader />
      <SidebarContent>
        <RecipeCategoryGroup />
        <UserMenuGroup />
      </SidebarContent>
    </Sidebar>
  );
}
