import { todayISO } from "./today";

export const habitsAfter = [
  {
    id: "habit-1",
    name: "Drink Water",
    description: "2 liters",
    frequency: { type: "daily" },
    startDate: todayISO(),
    logs: [
      {
        id: "log-1",
        date: todayISO(),
      },
    ],
  },
];
