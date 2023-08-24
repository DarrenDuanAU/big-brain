UI test file: frontend/cypress/e2e/bigBrainUI.cy.js

Anather UI test path here:
1. visit the web page
2. sign in then dashboard shown
3. create a new game/quiz and give the game a name
4. edit the game/quiz, which can also edit the game name here
5. add questions to this game/quiz, which includes question content, time limit(s), points, and 3 choices with one answer
6. go back to the dashboard
7. delete the game/quiz

It's a path showing user logged in and create a new game/quiz, then edited the quiz contents successfully, but we don't test start/end game here since it is already tested in first path.