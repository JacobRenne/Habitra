import { habitsBefore } from "../fixtures/habits-before";
import { habitsAfter } from "../fixtures/habits-after";
import { weeklyHabit } from "cypress/fixtures/weekly-habit";
import { habitsEmpty } from "../fixtures/habits-empty";
import { habitsAfterAdd } from "../fixtures/habits-after-add";

// Dashboard page intercepts
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

// Planner page intercepts
export function mockPlannerHabitsFlow() {
  let state: "empty" | "added" = "empty";

  cy.intercept("GET", "/api/habits", (req) => {
    req.reply({
      statusCode: 200,
      body: state === "empty" ? habitsEmpty : habitsAfterAdd,
    });
  }).as("getHabits");

  cy.intercept("POST", "/api/habits", (req) => {
    state = "added";
    req.reply({ statusCode: 201 });
  }).as("addHabit");

  cy.intercept("DELETE", /\/api\/habits\/.*/, (req) => {
    state = "empty";
    req.reply({ statusCode: 200 });
  }).as("deleteHabit");
}

// For future function
export function mockWeeklyHabits(days: number[]) {
  cy.intercept("GET", "/api/habits", {
    statusCode: 200,
    body: weeklyHabit(days),
  }).as("getWeeklyHabits");
}
