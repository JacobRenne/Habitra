import { useEffect, useState } from "react";
import type { Habit, HabitHistory } from "@/app/types/habit";
import { getTodayDate } from "../utils/date";

const HABITS_STORAGE_KEY = "habitra_habits";
const HISTORY_STORAGE_KEY = "habitra_history";

function loadHabitsFromStorage(): Habit[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(HABITS_STORAGE_KEY);
  if (!raw) return [];

  const parsed: unknown = JSON.parse(raw);
  if (Array.isArray(parsed)) {
    return parsed as Habit[];
  }

  return [];
}

function saveHabitsToStorage(habits: Habit[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HABITS_STORAGE_KEY, JSON.stringify(habits));
}

function loadHistoryFromStorage(): HabitHistory[] {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(HISTORY_STORAGE_KEY);
  if (!raw) return [];

  const parsed: unknown = JSON.parse(raw);
  if (Array.isArray(parsed)) {
    return parsed as HabitHistory[];
  }

  return [];
}

function saveHistoryToStorage(history: HabitHistory[]): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [history, setHistory] = useState<HabitHistory[]>([]);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    const loaded = loadHabitsFromStorage();
    const loadedHistory = loadHistoryFromStorage();
    setHabits(loaded);
    setHistory(loadedHistory);
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    saveHabitsToStorage(habits);
    saveHistoryToStorage(history);
  }, [habits, history, hasLoaded]);

  function addHabit(name: string, description?: string) {
    const trimmed = name.trim();
    if (!trimmed) return;

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: trimmed,
      description: description?.trim() ?? undefined,
      frequency: { type: "daily" },
      createdAt: getTodayDate(),
    };

    setHabits((previous) => [...previous, newHabit]);
  }

  function deleteHabit(id: string) {
    setHabits((previous) => previous.filter((habit) => habit.id !== id));
    setHistory((previous) => previous.filter((entry) => entry.habitId !== id));
  }

  function toggleCompletionForDate(habitId: string, date: string) {
    setHistory((previous) => {
      const exists = previous.some(
        (entry) => entry.habitId === habitId && entry.date === date,
      );
      if (exists) {
        return previous.filter(
          (entry) => !(entry.habitId === habitId && entry.date === date),
        );
      }
      return [...previous, { habitId, date }];
    });
  }

  return {
    habits,
    history,
    addHabit,
    deleteHabit,
    toggleCompletionForDate,
  };
}
