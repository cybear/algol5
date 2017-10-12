# Project

-[ ] Centralise types

## App TODO

-[ ] Show saved battles per game
-[ ] Show history after implementation
    -[x] Show history list
    -[x] State flag for current step
    -[ ] Nicify "current"
    -[x] Playback controls
    -[x] Button current<->history toggle

## Engine TODO

-[ ] Finish storing plr names/type in save
-[ ] Implement history
    -[x] create history entries
    -[x] add initial start history entry
    -[x] move turnstart to the currentstep version
    -[x] add stepnumber to historycreation, dont force app to do it
    -[ ] add boiluntil
    -[ ] add cmnd exclusion logic
    -[ ] add unit tests
-[x] Make possibilities deal with turnvars (see bogus layers in descent)
-[ ] New content data type, convert instructions  

## Library TODO

-[ ] Add rules etc to games
-[x] Tests for shoveoff
-[x] Tests for descent
-[x] Tests for duplo
-[ ] Prevent pushback in Aries
-[x] Prevent diagonal moves in Atrium

## Graphics TODO

-[ ] Add playing pieces to pics/css
-[ ] Dimensions and positions to css
-[ ] SVGify
-[ ] Make nicer :P