import { GameId } from "../../../../../games/dist/list";
import { BattleAction } from "../../types";
import { makeCreatorAndGuard } from "../../../../utils";

export type GoToHistoryFramePayload = {
  gameId: GameId;
  frame: number;
};

export type GoToHistoryFrameAction = BattleAction<
  "BATTLE::GO_TO_HISTORY_FRAME",
  GoToHistoryFramePayload
>;
export const [goToHistoryFrame, isGoToHistoryFrameAction] = makeCreatorAndGuard<
  GoToHistoryFrameAction
>("BATTLE::GO_TO_HISTORY_FRAME", (draft, { gameId, frame }) => {
  const currentGame = draft.battle.games[gameId]!;
  currentGame.battles[currentGame.currentBattle!].historyFrame = frame;
});