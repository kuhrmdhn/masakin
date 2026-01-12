import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/elements/sidebar/AppSidebar";
import AppHeader from "@/components/elements/header/AppHeader";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Masakin",
  description: "Food Recipes Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} antialiased bg-gray-50`}>
        <SidebarProvider>
          <AppSidebar />
          <main className="rounded-md bg-white w-full lg:m-2 ml-0 px-5">
            <AppHeader />
            {children}
          </main>
        </SidebarProvider>
        <Toaster richColors position="top-right" theme="light" />
      </body>
    </html>
  );
}
