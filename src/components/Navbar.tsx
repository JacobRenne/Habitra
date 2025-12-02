"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-background border-b">
      <div className="container mx-auto my-4 flex flex-wrap items-center justify-between gap-2 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-3xl font-bold tracking-tight"
        >
          Habitra
        </Link>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent",
                pathname === "/" && "bg-accent text-accent-foreground",
              )}
            >
              Dashboard
            </Link>

            <Link
              href="/planner"
              className={cn(
                navigationMenuTriggerStyle(),
                "bg-transparent",
                pathname === "/planner" && "bg-accent text-accent-foreground",
              )}
            >
              Planner
            </Link>
          </div>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
