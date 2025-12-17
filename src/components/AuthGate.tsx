"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { SignInForm } from "./SignInForm";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";

export function AuthGate({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  const router = useRouter();

  // Mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auth logic
  useEffect(() => {
    // Cypress bypasses auth gate
    if (typeof window !== "undefined" && (window as any).Cypress) {
      setSession({} as Session);
      setLoading(false);
      return;
    }

    let active = true;

    async function init() {
      const { data } = await supabase.auth.getSession();
      if (!active) return;

      setSession(data.session ?? null);
      setLoading(false);
    }

    void init();

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      router.refresh();
    });

    return () => {
      active = false;
      sub?.subscription.unsubscribe();
    };
  }, [router]);

  if (!mounted) return null;

  if (loading) {
    return <div className="p-6 text-center">Checking auth…</div>;
  }

  if (!session) {
    return (
      <div className="mx-auto max-w-md p-6">
        <h2 className="mb-2 text-xl font-semibold">Please sign in</h2>
        <SignInForm />
      </div>
    );
  }

  return <>{children}</>;
}
