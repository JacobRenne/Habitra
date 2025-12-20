import { todayISO } from "./today";

export const habitsAfter = [
  {
    id: "1",
    name: "Drink Water",
    description: "2 liters",
    frequency: "daily",
    startDate: todayISO(),
    logs: [
      {
        id: "log-1",
        date: todayISO(),
      },
    ],
  },
];
