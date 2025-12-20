import { weeklyHabit } from "../fixtures/weekly-habit";

describe("Weekly habits (future feature)", () => {
  it("shows weekly habit only on allowed weekdays", () => {
    // Monday = 1
    cy.intercept("GET", "/api/habits", {
      statusCode: 200,
      body: weeklyHabit([0]),
    }).as("getHabits");

    cy.visit("/");
    cy.wait("@getHabits");

    // Monday
    cy.get('input[type="date"]').clear().type("2024-01-01");
    cy.contains("Go to the gym").should("exist");

    // Tuesday
    cy.get('input[type="date"]').clear().type("2024-01-02");
    cy.contains("Go to the gym").should("not.exist");
  });
});
