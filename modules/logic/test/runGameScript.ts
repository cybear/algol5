import {
  GameTestSuite,
  AlgolStep,
  AlgolStepLinks,
  isAlgolInstrLine
} from "../../types";
import { getContentText } from "../../common";

export function runGameScript(
  id: string,
  game: any,
  scripts: GameTestSuite,
  debug?: boolean
) {
  for (const scriptName in scripts) {
    test(`Game - ${id} - ${scriptName}`, () => {
      const lines = scripts[scriptName];
      let step: any = game.newBattle();
      let n = 0;
      let lastFunc = "start1";
      while (lines.length) {
        n++;
        const line = lines.shift();
        for (const action of line.commands) {
          let func;
          if (
            ["win", "lose", "draw"].includes(action) ||
            (action === "endturn" &&
              ["win", "lose", "draw"].includes(step.LINKS.endturn))
          ) {
            if (lines.length) {
              throw new Error("Game end but lines remaining");
            }
            if (["start1", "start2"].includes(step.LINKS.endturn)) {
              throw new Error("Expected game to end but it didnt");
            }
            if (step.LINKS.endturn !== action) {
              throw new Error(
                `Game ended with unexpected winner: ${action} vs ${
                  step.LINKS.endturn
                }`
              );
            }
          } else {
            if (action === "endturn") {
              func = step.LINKS.endturn;
            } else if (step.LINKS.commands[action]) {
              func = step.LINKS.commands[action];
            } else {
              for (const markName in step.LINKS.marks) {
                if (step.LINKS.marks[markName].pos.includes(action)) {
                  func = step.LINKS.marks[markName].func;
                }
              }
            }
            if (!func) {
              throw new Error("Don't know what to do now! :/");
            } else {
              if (debug)
                console.log("N", n, "ACTION", action, "FUNCTION", func);
              const instr = game[lastFunc + "instruction"](step);
              const text = getContentText(instr);
              if (getMarkActions(step.LINKS).includes(action)) {
                expect(text.toLowerCase()).toMatch("select");
              } else if (step.LINKS.commands[action]) {
                expect(instr.line).toContainEqual({ command: action });
              } else if (
                action === "endturn" ||
                action === step.LINKS.endturn
              ) {
                expect(instr.line).toContainEqual({ command: "endturn" });
              }

              step = game[func](step, action);
              lastFunc = func;
            }
          }
        }
        if (debug) console.log("Checking", n, "turn", step.TURN);
        const availableActions = getAvailableActions(step.LINKS);
        if (line.include) {
          for (const inc of line.include) {
            expect(availableActions).toContain(inc);
          }
        }
        if (line.exclude) {
          for (const exc of line.exclude) {
            expect(availableActions).not.toContain(exc);
          }
        }
      }
    });
  }
}

function getMarkActions(links: AlgolStepLinks) {
  return Object.keys(links.marks).reduce(
    (mem, markName) => mem.concat(links.marks[markName].pos),
    []
  );
}

function getAvailableActions(links: AlgolStepLinks) {
  return Object.keys(links.commands)
    .concat(getMarkActions(links))
    .concat(links.endturn || []);
}
