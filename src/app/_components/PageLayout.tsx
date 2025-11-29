"use client";

import type { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-white/90">
      <div className="w-40 border-r-2 border-red-300 max-[560px]:hidden">
        <div className="flex h-16 items-center border-b border-gray-300 px-4">
          <h1 className="text-3xl font-bold">Habitra</h1>
        </div>
      </div>

      <div className="flex flex-1 flex-col">{children}</div>
    </div>
  );
}
