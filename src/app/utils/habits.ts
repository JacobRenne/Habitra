import type { Habit, HabitLog } from "@/app/types/habit";

export function isHabitActiveOnDate(habit: Habit, date: string): boolean {
  const start = (habit.startDate ?? habit.createdAt?.slice(0, 10)) as string;
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
): { incomplete: Habit[]; completed: Habit[] } {
  const completedIds = new Set(
    history.filter((h) => h.date === date).map((h) => h.habitId),
  );

  const incomplete: Habit[] = [];
  const completed: Habit[] = [];

  for (const habit of habits) {
    if (!isHabitActiveOnDate(habit, date)) continue;
    if (completedIds.has(habit.id)) completed.push(habit);
    else incomplete.push(habit);
  }

  return { incomplete, completed };
}
