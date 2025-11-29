"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 p-4 text-center text-xs text-gray-500">
      <p>
        Icon credit:{" "}
        <Link
          href="https://www.flaticon.com/free-icons/letter-h"
          target="_blank"
          className="underline hover:text-gray-700"
        >
          Letter h icons created by SyafriStudio - Flaticon
        </Link>
      </p>
    </footer>
  );
}
