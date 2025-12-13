import { habitsBefore } from "../fixtures/habits-before";
import { habitsAfter } from "../fixtures/habits-after";
import { weeklyHabit } from "cypress/fixtures/weekly-habit";

export function mockHabitsBefore() {
  cy.intercept("GET", "/api/habits", {
    statusCode: 200,
    body: habitsBefore,
  }).as("getHabits");
}

export function mockToggleHabit() {
  cy.intercept("POST", /\/api\/habits\/.*\/toggle/, {
    statusCode: 200,
    body: { toggled: "added" },
  }).as("toggleHabit");
}

export function mockHabitsAfter() {
  cy.intercept("GET", "/api/habits", {
    statusCode: 200,
    body: habitsAfter,
  }).as("getHabitsAfter");
}

// for future function
export function mockWeeklyHabits(days: number[]) {
  cy.intercept("GET", "/api/habits", {
    statusCode: 200,
    body: weeklyHabit(days),
  }).as("getWeeklyHabits");
}
