import { getTodayDate, addDays } from "@/app/utils/date";

/* Testing multiple habits to make sure it shows habits 
only on/after dates they were created */

describe("Multiple-habit createdAt visibility", () => {
  beforeEach(() => {
    cy.resetLocalStorage();
  });

  it("shows habits only on/after their createdAt dates", () => {
    // Create habits with different creation dates
    const today = getTodayDate();
    const day1 = addDays(today, 1);
    const day2 = addDays(today, 2);

    const habits = [
      { name: "Habit A", createdAt: today },
      { name: "Habit B", createdAt: day1 },
      { name: "Habit C", createdAt: day2 },
    ];

    // Add all habits to storage
    habits.forEach(({ name, createdAt }) => {
      cy.addHabitToStorage({
        id: crypto.randomUUID(),
        name,
        frequency: { type: "daily" },
        createdAt,
      });
    });

    cy.visit("/");

    // Checks number of todo iteams on given date
    function assertToDoCountFor(
      dateStr: string,
      expectedCount: number,
      expectedNames: string[],
    ) {
      cy.get('input[type="date"]').clear().type(dateStr);

      cy.contains("To Do")
        .parent()
        .find("li")
        .should("have.length", expectedCount);

      expectedNames.forEach((name) => {
        cy.contains("To Do").parent().should("contain", name);
      });
    }

    // Day 0: Habit A
    assertToDoCountFor(today, 1, ["Habit A"]);

    // Day 1: Habit A + Habit B
    assertToDoCountFor(day1, 2, ["Habit A", "Habit B"]);

    // Day 2: Habit A + Habit B + Habit C
    assertToDoCountFor(day2, 3, ["Habit A", "Habit B", "Habit C"]);
  });
});
