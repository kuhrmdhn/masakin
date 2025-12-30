import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { headers } from "next/headers";

export default async function SearchBar() {
  const reqHeaders = await headers();
  const params = reqHeaders.get("search-params");
  return (
    <form className="w-1/3 relative" action={"/search"} method="GET">
      <Input
        className="h-12 w-full placeholder:text-gray-400 focus-visible:border-transparent"
        defaultValue={params || undefined}
        type="search"
        name="q"
        placeholder="Cari Resep atau Nama Bahan"
        required
      />
      <Button className="absolute size-12 right-0 top-0" type="submit">
        <Search className="size-5" />
      </Button>
    </form>
  );
}
