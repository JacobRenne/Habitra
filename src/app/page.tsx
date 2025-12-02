"use client";

import { useState } from "react";
import { useHabits } from "@/app/hooks/useHabits";
import { getTodayDate } from "@/app/utils/date";
import { splitHabitsByCompletionForDate } from "@/app/utils/habits";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function HomePage() {
  const { habits, history, toggleCompletionForDate } = useHabits();
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());

  const { incomplete, completed } = splitHabitsByCompletionForDate(
    habits,
    history,
    selectedDate,
  );

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="container mx-auto max-w-2xl space-y-8 px-4 py-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Today's Focus</h1>
            <p className="text-muted-foreground">Manage your daily tasks.</p>
          </div>

          <div className="w-auto md:w-auto">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          {incomplete.length === 0 && habits.length > 0 && (
            <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center">
              All habits completed for today!
            </div>
          )}

          {incomplete.map((habit) => (
            <Card key={habit.id}>
              <CardContent className="flex items-center gap-4 p-4">
                <Checkbox
                  id={habit.id}
                  checked={false}
                  onCheckedChange={() =>
                    toggleCompletionForDate(habit.id, selectedDate)
                  }
                  className="h-7 w-7 cursor-pointer"
                />
                <div className="grid gap-1">
                  <label
                    htmlFor={habit.id}
                    className="cursor-pointer font-medium"
                  >
                    {habit.name}
                  </label>
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
          <div className="space-y-4 pt-4">
            <h2 className="text-muted-foreground text-sm font-semibold tracking-wider uppercase">
              Completed
            </h2>

            {completed.map((habit) => (
              <Card key={habit.id} className="bg-muted/40 opacity-60">
                <CardContent className="flex items-center gap-4 p-4">
                  <Checkbox
                    id={habit.id}
                    checked={true}
                    onCheckedChange={() =>
                      toggleCompletionForDate(habit.id, selectedDate)
                    }
                    className="h-7 w-7 cursor-pointer"
                  />
                  <div>
                    <label
                      htmlFor={habit.id}
                      className="text-muted-foreground cursor-pointer font-medium line-through"
                    >
                      {habit.name}
                    </label>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
