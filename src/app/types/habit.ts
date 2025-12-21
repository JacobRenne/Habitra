export type HabitFrequency = "daily" | "weekly";

export interface Habit {
  id: string;
  name: string;
  description?: string;
  startDate: string; // YYYY-MM-DD

  frequency: HabitFrequency;
  weekDays: number[]; // always exists, empty if daily

  createdAt: string;
  updatedAt?: string;
  userId?: string;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string; // YYYY-MM-DD
  createdAt?: string; // ISO
}
