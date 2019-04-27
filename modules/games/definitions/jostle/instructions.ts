import { JostleInstructions } from "./_types";

const jostleInstructions: JostleInstructions = {
  startTurn: { line: ["Select", "which unit to jostle!"] },
  selectunit: {
    line: [
      "This unit neighbours",
      { pluralize: [{ sizeof: "initialfriend" }, "friend", "friends"] },
      "and",
      { pluralize: [{ sizeof: "initialenemy" }, "enemy", "enemies"] },
      "making the square worth",
      {
        value: {
          minus: [{ sizeof: "initialfriend" }, { sizeof: "initialenemy" }]
        }
      },
      ".",
      "Select",
      "a higher value square to jostle to"
    ]
  },
  selectmovetarget: {
    line: [
      "From",
      "selectmovetarget",
      "you would neighbour",
      {
        pluralize: [
          { minus: [{ sizeof: "newfriend" }, 1] },
          "friend",
          "friends"
        ]
      },
      "and",
      { pluralize: [{ sizeof: "newenemy" }, "enemy", "enemies"] },
      "making the square worth",
      {
        value: {
          minus: [
            { minus: [{ sizeof: "newfriend" }, 1] },
            { sizeof: "newenemy" }
          ]
        }
      },
      ". Press",
      "jostle",
      "to move from",
      "selectunit",
      "to",
      "selectmovetarget"
    ]
  }
};

export default jostleInstructions;
