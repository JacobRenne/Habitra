import type { Habit, HabitLog } from "@/app/types/habit";

export function isHabitActiveOnDate(habit: Habit, date: string): boolean {
  const start = habit.startDate ?? habit.createdAt?.slice(0, 10);
  return start <= date;
}

export function isHabitCompletedOnDate(
  habitId: string,
  date: string,
  history: HabitLog[],
): boolean {
  return history.some(
    (entry) => entry.habitId === habitId && entry.date === date,
  );
}

export function splitHabitsByCompletionForDate(
  habits: Habit[],
  history: HabitLog[],
  date: string,
) {
  const completedIds = new Set(
    history.filter((l) => l.date === date).map((l) => l.habitId),
  );

  const completed = habits.filter((h) => completedIds.has(h.id));
  const incomplete = habits.filter((h) => !completedIds.has(h.id));

  return { completed, incomplete };
}
