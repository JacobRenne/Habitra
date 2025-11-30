describe("Planner page - add & delete", () => {
  beforeEach(() => {
    cy.resetLocalStorage();
    cy.visit("/planner");
  });

  it("can add a habit and delete it", () => {
    // Fill form
    cy.get('input[placeholder="Drink water"]').type("Run 5k");
    cy.get('input[placeholder="8 glasses per day"]').type("morning run");

    // Click submit
    cy.get('button[type="submit"]').click();

    // Verify habit exists
    cy.contains("Run 5k").should("exist");
    cy.contains("morning run").should("exist");

    // Delete habit
    cy.contains("button", "Delete").click();

    // Verify habit was deleted
    cy.contains("Run 5k").should("not.exist");
  });
});
