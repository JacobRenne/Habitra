"use client";

import { useEffect, useState } from "react";
import type { Habit as HabitType, HabitLog } from "@/app/types/habit";
import { apiFetch } from "@/lib/apiFetch";

type ServerHabit = {
  id: string;
  name: string;
  description?: string | null;
  frequency?: { type: "daily" | "weekly"; weekDays?: number[] } | null;
  startDate?: string | null; // "YYYY-MM-DD"
  createdAt?: string | null;
  updatedAt?: string | null;
  logs?: { id: string; date: string }[] | null;
  userId?: string;
};

export function useHabits() {
  const [habits, setHabits] = useState<HabitType[]>([]);
  const [history, setHistory] = useState<HabitLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchAll() {
    setLoading(true);
    setError(null);

    try {
      const res = await apiFetch("/api/habits"); // apiFetch sends the token
      if (!res.ok) {
        // helpful debug message for dev
        const text = await res.text();
        setError(`Failed to fetch habits: ${res.status} ${text}`);
        setHabits([]);
        setHistory([]);
        setLoading(false);
        return;
      }

      const data: ServerHabit[] = await res.json();

      const mappedHabits: HabitType[] = data.map((h) => ({
        id: h.id,
        name: h.name,
        description: h.description ?? undefined,
        // map frequency
        frequency:
          h.frequency?.type === "weekly"
            ? { type: "weekly", days: (h.frequency.weekDays ?? []) as any }
            : { type: "daily" },
        // prefer server startDate then createdAt for 'start'
        startDate:
          h.startDate ??
          (h.createdAt
            ? h.createdAt.slice(0, 10)
            : new Date().toISOString().slice(0, 10)),
        createdAt: h.createdAt ?? new Date().toISOString(),
        updatedAt: h.updatedAt ?? undefined,
        userId: h.userId ?? undefined,
        weekDays: h.frequency?.weekDays ?? undefined,
      }));

      const mappedHistory: HabitLog[] = data.flatMap((h) =>
        (h.logs || []).map((l) => ({ id: l.id, habitId: h.id, date: l.date })),
      );

      setHabits(mappedHabits);
      setHistory(mappedHistory);
    } catch (err) {
      setError(String(err));
      setHabits([]);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void fetchAll();
  }, []);

  async function addHabit(name: string, description?: string) {
    const body = { name, description, frequency: "daily" };
    const res = await apiFetch("/api/habits", {
      method: "POST",
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("addHabit failed:", res.status, text);
      return false;
    }
    await fetchAll();
    return true;
  }

  async function deleteHabit(id: string) {
    const res = await apiFetch(`/api/habits/${id}`, { method: "DELETE" });
    if (!res.ok) {
      console.error("deleteHabit failed", res.status, await res.text());
      return false;
    }
    await fetchAll();
    return true;
  }

  async function toggleCompletionForDate(habitId: string, date: string) {
    const res = await apiFetch(`/api/habits/${habitId}/toggle`, {
      method: "POST",
      body: JSON.stringify({ date }),
    });
    if (!res.ok) {
      console.error("toggle failed", res.status, await res.text());
      return false;
    }
    await fetchAll();
    return true;
  }

  return {
    habits,
    history,
    loading,
    error,
    addHabit,
    deleteHabit,
    toggleCompletionForDate,
    refetch: fetchAll,
  };
}
