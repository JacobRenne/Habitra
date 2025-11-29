"use client";

import { useState } from "react";
import { Navbar } from "./_components/Navbar";
import { HabitList } from "./_components/HabitList";
import { PageLayout } from "./_components/PageLayout";
import { Footer } from "./_components/Footer";
import { useHabits } from "@/app/hooks/useHabits";
import { getTodayDate } from "@/app/utils/date";
import { splitHabitsByCompletionForDate } from "@/app/utils/habits";

export default function HomePage() {
  const { habits, history, toggleCompletionForDate } = useHabits();
  const [selectedDate, setSelectedDate] = useState<string>(getTodayDate());

  const { incomplete, completed } = splitHabitsByCompletionForDate(
    habits,
    history,
    selectedDate,
  );

  const totalActiveHabits = incomplete.length + completed.length;

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDate(event.target.value);
  }

  return (
    <PageLayout>
      <Navbar />

      {/* Right-side content column: main + footer */}
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-6">
          <h1 className="mb-2 text-3xl font-bold">Today’s Habits</h1>
          <p className="mb-6 text-gray-600">The new age habit tracker!</p>

          <section className="mb-6">
            <h2 className="mb-1 font-semibold">Selected date</h2>
            <label>
              Date:{" "}
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="rounded border px-2 py-1"
              />
            </label>
          </section>

          <section className="mb-6">
            <h2 className="mb-1 font-semibold">Summary</h2>
            {totalActiveHabits === 0 ? (
              <p>No habits existed on this date.</p>
            ) : (
              <p>
                {completed.length} / {totalActiveHabits} habits completed on{" "}
                {selectedDate}.
              </p>
            )}
          </section>

          <div className="space-y-8">
            <HabitList
              title="To Do"
              habits={incomplete}
              actionLabel="Mark done"
              onActionClick={(habitId) =>
                toggleCompletionForDate(habitId, selectedDate)
              }
            />

            <HabitList
              title="Completed"
              habits={completed}
              actionLabel="Undo"
              onActionClick={(habitId) =>
                toggleCompletionForDate(habitId, selectedDate)
              }
            />
          </div>
        </main>

        <Footer />
      </div>
    </PageLayout>
  );
}
