import React from "react";
import { storiesOf } from "@storybook/react";
import { select } from "@storybook/addon-knobs";

import { Content } from ".";
import allStatefulAPIs from "../../../../battle/dist/allStatefulAPIs";

import { GameId, list } from "../../../../games/dist/list";

storiesOf("Content", module).add("Battle start instructions", () => {
  const gameId = select("Game", list, list[0]) as GameId;
  const api = allStatefulAPIs[gameId];
  const ui = api.newBattle().initialUI;
  return (
    <div>
      <p>First instruction when playing {gameId}:</p>
      <Content content={ui.instruction} />
    </div>
  );
});
