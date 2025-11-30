import React from "react";
import { HabitList } from "../../src/app/_components/HabitList";
import type { Habit } from "../../src/app/types/habit";

describe("HabitList component", () => {
  it("renders habits and triggers onActionClick", () => {
    const habits: Habit[] = [
      {
        id: "1",
        name: "Test Habit",
        createdAt: "2025-11-01",
        frequency: { type: "daily" },
      },
    ];

    const onActionClick = cy.stub().as("onActionClick");

    cy.mount(
      <HabitList
        title="Test"
        habits={habits}
        actionLabel="Mark done"
        onActionClick={(id: string) => onActionClick(id)}
      />,
    );

    cy.get("button").contains("Mark done").click();
    cy.get("@onActionClick").should("have.been.calledWith", "1");
  });
});
