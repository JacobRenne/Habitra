import { createClient } from "@supabase/supabase-js";
import type { NextRequest } from "next/server";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!url || !serviceKey) {
  throw new Error("Missing SUPABASE env variables for server");
}

const adminSupabase = createClient(url, serviceKey, {
  auth: { persistSession: false },
});

export async function getUserIdFromRequest(
  req: NextRequest,
): Promise<string | null> {
  const auth = req.headers.get("authorization") ?? "";
  const match = /^Bearer (.+)$/.exec(auth);
  const token = match ? match[1] : null;

  // Cypress auth bypass
  if (
    process.env.NODE_ENV === "test" ||
    req.headers.get("x-test-user") === "true"
  ) {
    return "test-user-id";
  }

  if (!token) {
    // development fallback x-user-id header allowed (for local tests)
    const dev = req.headers.get("x-user-id");
    if (dev) return dev;
    return null;
  }

  // validate token using admin client
  const { data, error } = await adminSupabase.auth.getUser(token);

  if (error || !data?.user) {
    return null;
  }

  return data.user.id;
}
