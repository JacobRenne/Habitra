import {
  mockHabitsBefore,
  mockHabitsAfter,
  mockToggleHabit,
} from "../support/intercepts";

describe("Dashboard habits", () => {
  it("moves habit to completed when toggled", () => {
    mockHabitsBefore();
    cy.visit("/");

    cy.wait("@getHabits");
    cy.contains("Drink Water").should("exist");

    mockToggleHabit();
    mockHabitsAfter();

    cy.get('[data-testid="habit-checkbox-1"]').click();

    cy.wait("@toggleHabit");
    cy.wait("@getHabitsAfter");

    cy.contains("Completed").should("exist");
    cy.contains("Drink Water").should("exist");
  });
});
