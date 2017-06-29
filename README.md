# Tic-Tac-Toe game
A rather basic tic-tac-toe game that syncs with an API to save stats and
game states.

## URL (play the game here!)
[Tic-Tac-Toe](http://jltyler.github.io/tic-tac-toe)

## Instructions
Sign up and log in (signing up will automatically log you in)
Click find games to start a new game or load an unfinished game

## Technologies used
- HTML5
- SCSS
- javascript
- jQuery
- Bootstrap
- Grunt

## Process
- Hashed out the plan for the game logic in [repl.it](https://repl.it)
- Planned out all the authentication requests
- Used curl to test the requests and confirm the responses and their format
- Did the same for all the game API requests and responses
- Implemented a very basic layout and temporary forms
- Hooked in ajax calls and events to the temporary forms
- Created gameboard with temporary debug functions
- Implemented game logic for the local machine
- Hooked in game logic to ajax calls
- Wrote stat reader function set
- Replaced all the forms and buttons with bootstrap equivalents
- Made the whole thing prettier

## Unsolved problems
- Allow a game to played without logging in

## Wireframes
[wireframe](https://wireframe.cc/sBIAHd)

## User stories
- I can register and login and have persistent game data
- I can click a valid space on the board to make a move
- I can retrieve and display the games I am currently involved in
- I can forfeit a game to end it early
