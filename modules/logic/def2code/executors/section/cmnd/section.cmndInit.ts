import { FullDefAnon } from "../../../../../types";
import { orderUsage } from "../sectionUtils";
import { analyseGame } from "../../../../../common";

export function executeCmndInit(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  const def = gameDef.flow.commands[action];

  let ret = "";

  // Always init a new LINKS object for each step
  ret += `let LINKS = { actions: {} }; `;

  const usage = orderUsage(gameDef, player, action);

  const analysis = analyseGame(gameDef)[player][action];

  if (usage.ARTIFACTS) {
    ret += `let ARTIFACTS = {
        ${analysis.priorArtifacts
          .filter(n => analysis.addedArtifacts.includes(n))
          .map(name => `${name}: { ...step.ARTIFACTS.${name} }`)
          .concat(
            analysis.priorArtifacts
              .filter(n => !analysis.addedArtifacts.includes(n))
              .map(name => `${name}: step.ARTIFACTS.${name}`)
          )
          .concat(
            analysis.addedArtifacts
              .filter(n => !analysis.priorArtifacts.includes(n))
              .map(name => `${name}: {}`)
          )
          .join(", ")}
      }; `;
  }
  if (usage.UNITLAYERS) {
    ret += "let UNITLAYERS = step.UNITLAYERS; ";
  }

  if (usage.TURNVARS === "mutates") {
    ret += `
    let TURNVARS = { ...step.TURNVARS };
    `;
  } else if (usage.TURNVARS === "reads") {
    ret += `let TURNVARS = step.TURNVARS; `;
  }

  if (usage.BATTLEVARS === "mutates") {
    ret += `
    let BATTLEVARS = { ...step.BATTLEVARS };
    `;
  } else if (usage.BATTLEVARS === "reads") {
    ret += `let BATTLEVARS = step.BATTLEVARS; `;
  }

  if (usage.UNITDATA === "mutates") {
    ret += `
    let UNITDATA = { ...step.UNITDATA };
    `;
  } else if (usage.UNITDATA === "reads") {
    ret += `let UNITDATA = step.UNITDATA; `;
  }

  if (usage.NEXTSPAWNID) {
    ret += `let NEXTSPAWNID = step.NEXTSPAWNID; `;
  }

  if (usage.TURN) {
    ret += `let TURN = step.TURN; `;
  }

  if (usage.MARKS) {
    ret += `let MARKS = step.MARKS; `;
  }

  return ret;
}
