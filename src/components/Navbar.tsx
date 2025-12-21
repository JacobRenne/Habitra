"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import type { Session } from "@supabase/supabase-js";

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/account");
    router.refresh();
  };

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!mounted) return;

        setSession(data.session);
      } catch (err) {
        console.warn("Navbar getSession error", err);
        if (mounted) setSession(null);
      }
    }
    void init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      mounted = false;
      sub?.subscription?.unsubscribe();
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
              <button
                onClick={handleLogout}
                className={cn(
                  navigationMenuTriggerStyle(),
                  "text-destructive hover:text-destructive hover:bg-destructive/10 cursor-pointer bg-transparent",
                )}
              >
                Log out
              </button>
            )}
          </div>

          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}
