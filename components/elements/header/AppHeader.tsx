import { SidebarTrigger } from "@/components/ui/sidebar";
import SearchBar from "./SearchBar";

export default function AppHeader() {
  return (
    <header className="h-20 w-full flex justify-between items-center px-3 sticky top-0 bg-white z-10">
      <SidebarTrigger />
      <SearchBar />
    </header>
  );
}
