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
  frequency: HabitFrequency;
  createdAt: string;
}

export interface HabitHistory {
  habitId: string;
  date: string;
}
