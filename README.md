# Habitra – Habit Tracker
A habit tracking app.
## Installation
1. npm install
2. npm run dev
3. Open http://localhost:3000
## Commands
**Formatting:**
npm run format:write – Prettier formatting
npm run lint – ESLint checks

**Run app:**
npm run dev – Development server
npm run preview – Production preview
## Cypress
**Open Cypress:**
npm run cypress:open
  
**Run all tests:**
E2E:
npm run cypress:run

Component:
npm run cypress:component

## Kurskrav

Github repo: https://github.com/JacobRenne/Habitra

### TDD
Funktionen för vecko vanor utvecklades enligt TDD. Jag skrev ett test med cypress 
förre att jag gjorde funktionen, jag behövde ändra testet lite då vecko funktionen
krävde ändringar som ändrade alla test.

- Test för vecko vanor: https://github.com/JacobRenne/Habitra/commit/0a73b9304041dff2dd34c30d10eddffd33e597c3

- Vecko funktionen: https://github.com/JacobRenne/Habitra/commit/9bcbbc56572c88ef9f5bf2e88f50a1fc1dc0dcb3

### UML-diagram
Ett diagram finns i source mappen för projektet med filnamnet: "uml-diagram-habit-toggle.png"