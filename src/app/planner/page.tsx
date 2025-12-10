"use client";

import { useState } from "react";
import { useHabits } from "@/app/hooks/useHabits";
import { Trash2, Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function PlannerPage() {
  const { habits, addHabit, deleteHabit, loading, error, refetch } =
    useHabits();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!name.trim()) return;
    setSubmitting(true);
    setActionError(null);

    try {
      const ok = await addHabit(name.trim(), description.trim() || undefined);
      if (!ok) {
        setActionError("Failed to create habit. Make sure you're signed in.");
      } else {
        setName("");
        setDescription("");
      }
      await refetch();
    } catch (err) {
      console.error("Add habit error", err);
      setActionError("Failed to create habit (network error).");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this habit? This will remove its completion history."))
      return;
    const ok = await deleteHabit(id);
    if (!ok) {
      setActionError("Failed to delete habit.");
    } else {
      await refetch();
    }
  }

  return (
    <div className="bg-background min-h-screen">
      <Navbar />

      <main className="container mx-auto max-w-2xl space-y-8 px-4 py-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Planner</h1>
          <p className="text-muted-foreground">
            Create and manage your habits.
          </p>
        </div>

        <Card className="py-6">
          <CardHeader>
            <CardTitle>Add New Habit</CardTitle>
            <CardDescription>What do you want to track daily?</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Drink Water"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  placeholder="e.g. 2 liters per day"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto"
                disabled={submitting}
              >
                <Plus className="mr-2 h-4 w-4" />{" "}
                {submitting ? "Creating..." : "Create Habit"}
              </Button>

              {actionError && (
                <div className="text-sm text-red-600">{actionError}</div>
              )}
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold tracking-tight">Your Habits</h2>

          {loading && (
            <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center">
              Loading…
            </div>
          )}

          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-700">
              {typeof error === "string"
                ? error
                : "An error occurred while loading habits."}
            </div>
          )}

          {habits.length === 0 && !loading ? (
            <div className="text-muted-foreground rounded-lg border border-dashed p-8 text-center">
              No habits created yet. Use the form above to start!
            </div>
          ) : (
            <div className="grid gap-3">
              {habits.map((habit) => (
                <Card key={habit.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="grid gap-1">
                      <span className="font-medium">{habit.name}</span>
                      {habit.description && (
                        <p className="text-muted-foreground text-sm">
                          {habit.description}
                        </p>
                      )}
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(habit.id)}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
