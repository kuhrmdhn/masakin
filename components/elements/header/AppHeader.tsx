import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AppHeader() {
  return (
    <header className="h-20 w-full flex justify-between items-center px-3 sticky top-0 bg-white">
      <SidebarTrigger />
    </header>
  );
}
