import {
  Given,
  When,
  Then,
  Before,
} from "@badeball/cypress-cucumber-preprocessor";

Before(() => {
  cy.resetLocalStorage();
});

Given("I have a habit named {string}", (name: string) => {
  cy.addUiHabit(name);
});

When("I mark that habit done on the home page", () => {
  cy.visit("/");
  cy.contains("button", "Mark done").click();
});

Then("the completed list should contain {string}", (name: string) => {
  cy.contains("Completed").parent().should("contain", name);
});
