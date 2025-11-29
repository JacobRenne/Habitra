import type { Habit, HabitHistory } from "@/app/types/habit";

export function isHabitActiveOnDate(habit: Habit, date: string): boolean {
  const created = new Date(habit.createdAt);
  const selected = new Date(date);

  return selected >= created;
}

export function splitHabitsByCompletionForDate(
  habits: Habit[],
  history: HabitHistory[],
  date: string,
): {
  incomplete: Habit[];
  completed: Habit[];
} {
  const completedIds = new Set(
    history
      .filter((entry) => entry.date === date)
      .map((entry) => entry.habitId),
  );

  const incomplete: Habit[] = [];
  const completed: Habit[] = [];

  for (const habit of habits) {
    if (!isHabitActiveOnDate(habit, date)) {
      continue;
    }

    if (completedIds.has(habit.id)) {
      completed.push(habit);
    } else {
      incomplete.push(habit);
    }
  }

  return { incomplete, completed };
}
