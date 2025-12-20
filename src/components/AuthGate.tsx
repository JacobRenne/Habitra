"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";

export function AuthGate({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // Cypress bypass
    if (typeof window !== "undefined" && (window as any).Cypress) {
      setSession({} as Session);
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session ?? null);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      active = false;
      sub?.subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Checking auth…</div>;
  }

  if (!session) {
    router.replace("/account");
    return null;
  }

  return <>{children}</>;
}
