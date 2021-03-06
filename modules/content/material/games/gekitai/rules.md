---
updated: 2020-02-20
---

{GAME} is played on an initially empty {DIM} board. Each player has 8 offboard {UNIT}, which they take turn to {CMND} onto the board on any empty square.

A newly dropped unit will **push** adjacent units, unless there is another unit in the way behind it. Units pushed off the board are removed.

<div class="md-example">

So if {PLR:who=1} were to {CMND} at {POS:at=b2} in this board state...

{ARR:name=beforepush1,from=a1,to=f3}

...then this would be the result:

{ARR:name=afterpush1,from=a1,to=f3}

Both {UNIT:at=a1,who=1} and {UNIT:at=a2,who=2} were pushed off board, and {UNIT:at=b3,who=2} was pushed to {POS:at=b4}. {UNIT:at=c2,who=1} stays put since {UNIT:at=d2,who=2} blocks the push.

</div>

After a drop we check for the following in order:

1. If you have 3 {UNIT} in a row you win by {ENDGAME:name=winline}
1. If you have deployed all 8 {UNIT} you win by {ENDGAME:name=allout}
1. If your opponent has 3 {UNIT} in a row (including diagonals) you lose by {ENDGAME:name=suicide}.

Draws are not possible.
