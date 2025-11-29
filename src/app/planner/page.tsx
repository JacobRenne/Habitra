"use client";

import { useState } from "react";
import { useHabits } from "@/app/hooks/useHabits";
import { Navbar } from "../_components/Navbar";
import { PageLayout } from "../_components/PageLayout";
import { Footer } from "../_components/Footer";
import { Button } from "../_components/Button";

export default function PlannerPage() {
  const { habits, addHabit, deleteHabit } = useHabits();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addHabit(name, description);
    setName("");
    setDescription("");
  }

  return (
    <PageLayout>
      <Navbar />

      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-6">
          <h1 className="mb-2 text-3xl font-bold">Habit Planner</h1>

          <section className="mb-6">
            <h2 className="mb-2 font-semibold">Add habit</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium">Name</label>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Drink water"
                  className="w-full max-w-sm rounded border px-2 py-1"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Description (optional)
                </label>
                <input
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="8 glasses per day"
                  className="w-full max-w-sm rounded border px-2 py-1"
                />
              </div>

              <p className="text-sm text-gray-600">
                For now, all habits are daily.
              </p>

              <Button type="submit" variant="primary">
                Add habit
              </Button>
            </form>
          </section>

          <section>
            <h2 className="mb-2 font-semibold">Existing habits</h2>

            {habits.length === 0 ? (
              <p className="text-sm text-gray-600">No habits yet.</p>
            ) : (
              <ul className="space-y-2 border-l-2 border-dashed border-gray-300 pl-2">
                {habits.map((habit) => (
                  <li
                    key={habit.id}
                    className="flex items-center justify-start gap-2"
                  >
                    <div>
                      <strong>{habit.name}</strong>
                      {habit.description && (
                        <>
                          {" "}
                          -{" "}
                          <span className="text-sm text-gray-600">
                            {habit.description}
                          </span>
                        </>
                      )}
                    </div>

                    <Button
                      type="button"
                      variant="danger"
                      onClick={() => deleteHabit(habit.id)}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>

        <Footer />
      </div>
    </PageLayout>
  );
}
