import { AlgolSection, FullDefAnon } from "../../../../types";
import { executeMarkEnd, executeMarkInit } from "./mark";
import { executeStartInit, executeStartEnd } from "./start";
import { executeCmndInit } from "./cmnd";
import { executeOrderSection } from "./section.orders";

export function executeSection(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  section: AlgolSection
): string {
  switch (section) {
    case "markInit":
      return executeMarkInit(gameDef, player, action);
    case "markEnd":
      return executeMarkEnd(gameDef, player, action);
    case "orders":
      return executeOrderSection(gameDef, player, action);
    case "startInit":
      return executeStartInit(gameDef, player, action);
    case "startEnd":
      return executeStartEnd(gameDef, player, action);
    case "cmndInit":
      return executeCmndInit(gameDef, player, action);
    default:
      throw new Error("Unknown section: " + JSON.stringify(section));
  }
}
