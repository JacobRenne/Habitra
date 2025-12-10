"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export function SignUpForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage(
      "Sign-up successful. Check your email to confirm (if required).",
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded border px-2 py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded border px-2 py-1"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-500 px-3 py-1 text-white"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </div>

      {message && <div className="text-sm text-gray-700">{message}</div>}
    </form>
  );
}
