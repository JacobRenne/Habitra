import { todayISO } from "./today";

export const habitsBefore = [
  {
    id: "habit-1",
    name: "Drink Water",
    description: "2 liters",
    frequency: { type: "daily" },
    startDate: todayISO(),
    logs: [],
  },
];
