import { FullDefAnon } from "../../../../types";
import { emptyUnitLayers } from "../../../../common";

export function executeStartInit(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string
): string {
  let ret = "";
  const unitLayerNames = Object.keys(emptyUnitLayers(gameDef));

  ret += `
  const oldUnitLayers = step.UNITLAYERS;
  const UNITLAYERS = {
    ${unitLayerNames
      .map(
        name =>
          name +
          ": oldUnitLayers." +
          (name.match(/^my/)
            ? "opp" + name.slice(2)
            : name.match(/^opp/)
            ? "my" + name.slice(3)
            : name)
      )
      .join(",\n")}
  };
  `;

  ret += `const ARTIFACTS = emptyArtifactLayers;`;

  ret += `
  const turn = {
    turn: lastTurn.turn + 1,
    links: { root: {} },
    steps: {},
    player: ${player},
    endMarks: {}
  };`;

  return ret;
}
