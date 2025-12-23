"use client";
import { useSidebar } from "@/components/ui/sidebar";
import Image from "next/image";
import React from "react";

export default function AppLogo({
  ...props
}: Partial<React.ComponentProps<typeof Image>>) {
  const { open } = useSidebar();
  return (
    <span className="max-h-20 h-full flex items-center">
      <Image
        src={open ? "/logo-with-text.svg" : "/logo-only-icon.svg"}
        height={1080}
        width={1080}
        alt="Masakin Header Logo"
        className={`h-1/2 aspect-video ${props.className}`}
      />
    </span>
  );
}
