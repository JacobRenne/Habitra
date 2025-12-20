"use client";

import { useState } from "react";
import { useHabits } from "@/app/hooks/useHabits";
import { getTodayDate } from "@/app/utils/date";
import { splitHabitsByCompletionForDate } from "@/app/utils/habits";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const { habits, history, toggleCompletionForDate, loading, error, refetch } =
    useHabits();

  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [isToggling, setIsToggling] = useState<string | null>(null);

  // Monday = 0, Sunday = 6
  function getSwedishWeekday(date: Date): number {
    return (date.getDay() + 6) % 7;
  }

  const selected = new Date(`${selectedDate}T00:00:00`);
  const swedishWeekday = getSwedishWeekday(selected);

  const visibleHabits = habits.filter((habit) => {
    if (habit.frequency === "daily") return true;

    if (habit.frequency === "weekly") {
      return habit.weekDays.includes(swedishWeekday);
    }

    return false;
  });

  const { incomplete, completed } = splitHabitsByCompletionForDate(
    visibleHabits,
    history,
    selectedDate,
  );

  async function handleToggle(habitId: string) {
    if (isToggling) return;
    setIsToggling(habitId);
    try {
      await toggleCompletionForDate(habitId, selectedDate);
      await refetch();
    } finally {
      setIsToggling(null);
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto max-w-2xl space-y-8 px-4 py-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Today's Focus</h1>
            <p className="text-muted-foreground">
              Manage your habits for the selected day.
            </p>
          </div>

          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
        </div>

        {loading && (
          <div className="text-muted-foreground text-center">
            Loading habits…
          </div>
        )}

        {error && (
          <div className="text-center text-sm text-red-600">{error}</div>
        )}

        {incomplete.length === 0 && visibleHabits.length > 0 && (
          <div className="text-muted-foreground text-center">
            All habits completed for this day 🎉
          </div>
        )}

        <div className="space-y-3">
          {incomplete.map((habit) => (
            <Card key={habit.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <Checkbox
                  data-testid={`habit-checkbox-${habit.id}`}
                  checked={false}
                  onCheckedChange={() => handleToggle(habit.id)}
                />
                <div>
                  <p className="font-medium">{habit.name}</p>
                  {habit.description && (
                    <p className="text-muted-foreground text-sm">
                      {habit.description}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {completed.length > 0 && (
          <div className="space-y-2 pt-4">
            <h2 className="text-muted-foreground text-sm uppercase">
              Completed
            </h2>

            {completed.map((habit) => (
              <Card key={habit.id} className="opacity-60">
                <CardContent className="flex items-center gap-4 p-4">
                  <Checkbox
                    checked
                    onCheckedChange={() => handleToggle(habit.id)}
                  />
                  <span className="text-muted-foreground line-through">
                    {habit.name}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
