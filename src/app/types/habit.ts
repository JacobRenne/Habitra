export type DayOfWeek =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type HabitFrequency =
  | { type: "daily" }
  | { type: "weekly"; days: DayOfWeek[] };

export interface Habit {
  id: string;
  name: string;
  description?: string;
  startDate: string; // YYYY-MM-DD
  frequency: HabitFrequency;
  weekDays?: number[]; // 0..6 mapping for Mon..Sun (optional)
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
