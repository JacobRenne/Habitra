"use client";

import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import type { Session } from "@supabase/supabase-js";

function extractSession(result: unknown): Session | null {
  const anyResult: any = result;
  const rawData = anyResult?.data;
  if (rawData && typeof rawData === "object") {
    if ("session" in rawData) return rawData.session as Session | null;
    return rawData as Session | null;
  }
  if (anyResult && typeof anyResult === "object" && "user" in anyResult) {
    return anyResult as Session;
  }
  return null;
}

async function handleLogout() {
  await supabase.auth.signOut();
  redirect("/account");
}

export function Navbar() {
  const pathname = usePathname();
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const result = await supabase.auth.getSession();
        if (!mounted) return;
        setSession(extractSession(result));
      } catch (err) {
        console.warn("Navbar getSession error", err);
        if (mounted) setSession(null);
      }
    }
    void init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, state) => {
      try {
        setSession(extractSession(state));
      } catch (e) {
        console.warn("Navbar onAuthStateChange error", e);
        setSession(null);
      }
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe?.();
    };
  }, []);

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
            {session && (
              <>
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
                    pathname === "/planner" &&
                      "bg-accent text-accent-foreground",
                  )}
                >
                  Planner
                </Link>
              </>
            )}

            {!session ? (
              <Link
                href="/account"
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === "/account" && "bg-accent text-accent-foreground",
                )}
              >
                Account
              </Link>
            ) : (
              <Link
                href="/"
                onClick={handleLogout}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "text-destructive hover:text-destructive hover:bg-destructive/10 bg-transparent",
                )}
              >
                Log out
              </Link>
            )}
          </div>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
