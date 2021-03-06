import prettier from "prettier";
import { executeSection } from "./executors/section";
import { FullDefAnon } from "../../types";
import { analyseGame, rulesetNames } from "../../common";

export function compileGameToCode(gameDef: FullDefAnon) {
  const analysis = analyseGame(gameDef);

  const ruleNames = rulesetNames(gameDef);

  const combos: [string, 1 | 2][] = ruleNames.flatMap(n => [
    [n, 1],
    [n, 2],
  ]);

  const cmndInfo = Object.keys(gameDef.flow.commands)
    .map(c => `${c}: {}`)
    .join(", ");

  const instructions = combos.flatMap(([ruleset, player]) => [
    `startTurn_${ruleset}_${player}: (step) => {
      ${executeSection(gameDef, player, "startTurn", ruleset, "instruction")}
    }`,
    ...Object.keys(gameDef.flow.commands)
      .filter(c => analysis[ruleset][player][c])
      .map(cmndName =>
        gameDef.instructions[cmndName]
          ? `${cmndName}_${ruleset}_${player}: (step) => {${executeSection(
              gameDef,
              player,
              cmndName,
              ruleset,
              "instruction"
            )}}`
          : `${cmndName}_${ruleset}_${player}: () => defaultInstruction(${player})`
      ),
    ...Object.keys(gameDef.flow.marks)
      .filter(c => analysis[ruleset][player][c])
      .map(
        markName => `${markName}_${ruleset}_${player}: (step) => {
        ${executeSection(gameDef, player, markName, ruleset, "instruction")}
      }`
      ),
  ]);

  const marks = combos.flatMap(([ruleset, player]) =>
    Object.keys(gameDef.flow.marks)
      .filter(m => analysis[ruleset][player][m])
      .map(
        markName => `${markName}_${ruleset}_${player}: (step, newMarkPos) => {
        ${executeSection(gameDef, player, markName, ruleset, "markInit")}
        ${executeSection(gameDef, player, markName, ruleset, "orders")}
        ${executeSection(gameDef, player, markName, ruleset, "markEnd")}
      }`
      )
  );

  const commands = combos.flatMap(([ruleset, player]) =>
    Object.keys(gameDef.flow.commands)
      .filter(c => analysis[ruleset][player][c])
      .map(
        cmndName =>
          `${cmndName}_${ruleset}_${player}: (step) => {
        ${executeSection(gameDef, player, cmndName, ruleset, "cmndInit")}
        ${executeSection(gameDef, player, cmndName, ruleset, "orders")}
        ${executeSection(gameDef, player, cmndName, ruleset, "cmndEnd")}
      }`
      )
  );

  const starts = combos.flatMap(
    ([ruleset, player]) => `startTurn_${ruleset}_${player}: (step) => {
    ${executeSection(gameDef, player, "startTurn", ruleset, "startInit")}
    ${executeSection(gameDef, player, "startTurn", ruleset, "orders")}
    ${executeSection(gameDef, player, "startTurn", ruleset, "startEnd")}
  } `
  );

  const hasGrids = !!Object.values(gameDef.boards).find(b => b.grids);

  const code = `

import {offsetPos, whoWins, boardConnections, makeRelativeDirs, setup2army, coords2pos, boardLayers, terrainLayers, collapseContent, defaultInstruction, roseDirs, orthoDirs, diagDirs, knightDirs, jumpTwoDirs, ringTwoDirs${
    hasGrids ? ", makeGrids" : ""
  }} from '../../common'

import boards from '../../games/definitions/${gameDef.meta.id}/boards'
import setups from '../../games/definitions/${gameDef.meta.id}/setups'
import variants from '../../games/definitions/${gameDef.meta.id}/variants'

${executeSection(gameDef, 1, "head", "allRulesets", "head")}

${ruleNames
  .map(ruleset => executeSection(gameDef, 1, "hydra", ruleset, "hydra"))
  .join("\n\n")}

const game = {
  gameId: '${gameDef.meta.id}',
  commands: { ${cmndInfo} },
  iconMap: iconMapping,
  setBoard: (board) => {
    ${executeSection(gameDef, 2, "setBoard", "allRulesets", "setBoard")}
  },
  newBattle: (setup, ruleset) => {
    ${executeSection(gameDef, 2, "newBattle", "allRulesets", "newBattle")}
  },
  action: {
    ${starts.join(", ")},
    ${marks.join(", ")} ${marks.length ? "," : ""}
    ${commands.join(", ")}
  },
  instruction: {
    ${instructions.join(", ")}
  },
  variants,
  boards,
  setups
};

export default game; 
`;

  return prettier.format(code.replace(/[\n\r]( *[\n\r])*/g, "\n"), {
    parser: "typescript",
  });
}
