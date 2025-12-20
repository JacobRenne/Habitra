export function weeklyHabit(days: number[]) {
  return [
    {
      id: "1",
      name: "Go to the gym",
      description: "Weekly workout",
      frequency: "weekly",
      weekDays: days,
      startDate: "2024-01-01", // a monday
      logs: [],
    },
  ];
}
