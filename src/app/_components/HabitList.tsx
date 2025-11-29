"use client";

import type { Habit } from "@/app/types/habit";
import { Button } from "./Button";

interface HabitListProps {
  title: string;
  habits: Habit[];
  actionLabel?: string;
  onActionClick?: (habitId: string) => void;
}

export function HabitList({
  title,
  habits,
  actionLabel,
  onActionClick,
}: HabitListProps) {
  return (
    <section>
      <h2 className="mb-2 font-semibold">{title}</h2>

      {habits.length === 0 ? (
        <p className="pl-2 text-sm text-gray-600">No habits.</p>
      ) : (
        <ul className="space-y-2 border-l-2 border-dashed border-gray-300 pl-3">
          {habits.map((habit) => (
            <li key={habit.id} className="flex items-center gap-4">
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

              {actionLabel && onActionClick && (
                <Button
                  type="button"
                  variant={actionLabel === "Undo" ? "secondary" : "primary"}
                  onClick={() => onActionClick(habit.id)}
                >
                  {actionLabel}
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
