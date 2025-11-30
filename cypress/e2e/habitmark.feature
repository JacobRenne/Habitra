Feature: Mark a habit as completed

I should be able to add a habit and when I go to the home page 
and click on "Mark done" it should move to the completed section

  Scenario: Mark habit as completed via UI
    Given I have a habit named "Brush teeth"
    When I mark that habit done on the home page
    Then the completed list should contain "Brush teeth"
