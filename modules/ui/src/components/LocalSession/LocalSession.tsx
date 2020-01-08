import React, { FunctionComponent } from "react";
import css from "./LocalSession.cssProxy";
import {
  AlgolLocalBattle,
  AlgolGameGraphics,
  AlgolMeta,
} from "../../../../types";
import { Button } from "../Button";
import { SessionList } from "../SessionList";

export interface LocalSessionActions {
  new: () => void;
  load: (session: AlgolLocalBattle) => void;
}

type LocalSession = {
  sessions: AlgolLocalBattle[];
  graphics: AlgolGameGraphics;
  actions: LocalSessionActions;
};

export const LocalSession: FunctionComponent<LocalSession> = props => {
  const { actions, sessions, graphics } = props;
  return (
    <div className={css.localSession}>
      <Button onClick={actions.new}>New local hotseat session</Button>
      <div className={css.localSessionDivider} />
      <Button notImplemented="AI is in the works, but remote play will be implemented first.">
        Versus AI
      </Button>
      <div className={css.localSessionDivider} />
      <SessionList sessions={sessions} graphics={graphics} actions={actions} />
    </div>
  );
};
