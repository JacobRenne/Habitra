"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex h-16 items-center justify-center gap-6 border-b border-gray-300 px-4">
      <Link
        href="/"
        className={`${
          pathname === "/" ? "font-semibold underline" : ""
        } hover:underline`}
      >
        Home
      </Link>
      <Link
        href="/planner"
        className={`${
          pathname === "/planner" ? "font-semibold underline" : ""
        } hover:underline`}
      >
        Planner
      </Link>
    </nav>
  );
}
