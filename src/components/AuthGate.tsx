"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { supabase } from "@/lib/supabaseClient";
import { SignInForm } from "./SignInForm";
import { useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";

export function AuthGate({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function init() {
      try {
        const result = await supabase.auth.getSession();
        const rawData: any = (result as any)?.data;
        const maybeSession: Session | null =
          rawData && typeof rawData === "object" && "session" in rawData
            ? (rawData.session as Session | null)
            : (rawData as Session | null);

        if (!mounted) return;
        setSession(maybeSession ?? null);
      } catch (err) {
        console.warn("AuthGate getSession error", err);
        if (mounted) setSession(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    void init();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, state) => {
        try {
          const s: any = (state as any)?.session ?? (state as any);
          setSession(s ?? null);
          router.refresh();
        } catch (e) {
          console.warn("onAuthStateChange parsing error", e);
          setSession(null);
        }
      },
    );

    return () => {
      mounted = false;
      subscription?.subscription?.unsubscribe?.();
    };
  }, [router]);

  if (loading) return <div className="p-6 text-center">Checking auth…</div>;

  if (!session) {
    return (
      <div className="p-6">
        <h2 className="mb-4 text-xl font-semibold">Welcome to Habitra</h2>
        <p className="text-muted-foreground mb-4">
          Please sign in to continue.
        </p>
        <SignInForm />
      </div>
    );
  }

  return <>{children}</>;
}
