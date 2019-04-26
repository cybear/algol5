import * as React from "react";
import { GameId } from "../../games/dist/list";
import { AlgolBoardState } from "../../types";

import { Piece } from "./Piece";

import dataURIs from "../../graphics/dist/svgDataURIs";
import { Mark } from "./Mark";

type BoardProps = {
  gameId: GameId;
  state: AlgolBoardState;
  callback: (pos: string) => void;
};

export const Board: React.FunctionComponent<BoardProps> = ({
  gameId,
  state: { marks, potentialMarks, units },
  callback
}) => {
  const { dataURI, height, width } = dataURIs[gameId];
  return (
    <div
      style={{
        background: `url("${dataURI}")`,
        // maintain aspect ratio of board by exploiting that % in padding-top/bottom refers to width
        paddingTop: `${((height + 1) / (width + 1)) * 100}%`,
        position: "relative"
      }}
    >
      <div
        style={{ position: "absolute", top: 0, width: "100%", height: "100%" }}
      >
        {marks
          .map(pos => [pos, true])
          .concat(potentialMarks.map(pos => [pos, false]))
          .map(([pos, selected]: [string, boolean]) => (
            <Mark
              key={pos}
              callback={callback}
              pos={pos}
              potential={!selected}
              height={height}
              width={width}
            />
          ))}
        {Object.keys(units).map(id => (
          <Piece key={id} {...units[id]} height={height} width={width} />
        ))}
      </div>
    </div>
  );
};
