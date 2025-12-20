import { mockPlannerHabitsFlow } from "../support/intercepts";

describe("Planner page", () => {
  it("adds and removes a habit using the UI", () => {
    mockPlannerHabitsFlow();

    cy.visit("/planner");

    cy.wait("@getHabits");
    cy.contains("No habits created yet").should("exist");

    cy.get('input[id="name"]').type("Read a book");
    cy.get('button[type="submit"]').click();

    cy.wait("@addHabit");
    cy.wait("@getHabits");

    cy.contains("Read a book").should("exist");

    cy.get('[data-testid="habit-delete-1"]').click();

    cy.wait("@deleteHabit");
    cy.wait("@getHabits");

    cy.contains("Read a book").should("not.exist");
  });
});
