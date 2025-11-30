describe("Home page - mark done and undo", () => {
  beforeEach(() => {
    cy.resetLocalStorage();
    cy.addUiHabit("Meditate");
  });

  it("marks habit as done and then unmarks it", () => {
    cy.visit("/");

    // Verify habit exists
    cy.contains("To Do").parent().should("contain", "Meditate");

    // Click Mark done button
    cy.contains("button", "Mark done").click();

    // Verify habit moved to completed
    cy.contains("Completed").parent().should("contain", "Meditate");

    // Click Undo button
    cy.contains("button", "Undo").click();

    // Verify habit moved back to "To Do"
    cy.contains("To Do").parent().should("contain", "Meditate");
  });
});
