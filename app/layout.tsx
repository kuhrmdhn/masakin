import SidebarAndHeaderLayout from "@/components/layout/SidebarAndHeaderLayout";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

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
        <SidebarAndHeaderLayout>{children}</SidebarAndHeaderLayout>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
