declare global {
  namespace Cypress {
    interface Chainable {
      resetLocalStorage(): Chainable<void>;
      addUiHabit(name: string, description?: string): Chainable<void>;
      addHabitToStorage(habit: {
        id: string;
        name: string;
        description?: string;
        frequency: any;
        createdAt: string;
      }): Chainable<void>;
    }
  }
}

// Resets local storage
Cypress.Commands.add("resetLocalStorage", () => {
  cy.window().then((win) => {
    win.localStorage.clear();
  });
});

// Add a habit using the UI
Cypress.Commands.add("addUiHabit", (name: string, description?: string) => {
  cy.visit("/planner");
  cy.get('input[placeholder="Drink water"]').first().clear().type(name);
  if (description) {
    cy.get('input[placeholder="8 glasses per day"]').clear().type(description);
  }
  cy.get('button[type="submit"]').click();
});

// Add a habit straight into localstorage
Cypress.Commands.add("addHabitToStorage", (habit) => {
  cy.window().then((win) => {
    const key = "habitra_habits";
    const raw = win.localStorage.getItem(key) ?? "[]";
    const arr = JSON.parse(raw);
    arr.push(habit);
    win.localStorage.setItem(key, JSON.stringify(arr));
  });
});
