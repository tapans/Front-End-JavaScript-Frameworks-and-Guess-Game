# Front-End-JavaScript-Frameworks-and-Guess-Game
Various Implementations of a simple Guess Game using different client side JavaScript frameworks / libraries.

The guess game flow is as follows:
<ol>
<li>Application randomly selects a number</li>
<li>User makes a guess</li>
<li>Application provides feedback as to whether the guess was low, high or correct, and maintains guess History</li>
<li>When user guesses the correct number, the application notifies the user of the number of tries it took them, the application disables the guess button and displays a restart button to the user </li>
<li>When the user clicks restart, the application selects a new secret number and resets all the counts as well as the guess history</li>
</ol>
 
##Architecture and Implementation Notes:
<ol>
<li><a href='Angular'>Angular</a>: Factory singleton 'logFactory' is used to maintain history of guesses across the default and restartGame views, Controller 'LogController' handles the main game logic and also redirects user to gameOver view when users guess the secret number correctly.</li>
<li><a href='Vanilla'>Vanilla</a>: game logic in raw javascript</li>
<li><a href='React'>React</a>: Essentially all the logic is in the GuessGameApp component which has the sub-components: GuessHistory, GuessHistoryEntry, and RestartButton. See <a href='React/app.js'>React/app.js</a></li>
</ol>
