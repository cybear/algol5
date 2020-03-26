import React, { memo, useMemo } from "react";

import {
  AlgolUnitState,
  AlgolPosition,
  AlgolAnimCompiled,
  AlgolGameGraphics,
} from "../../../../types";
import { emptyAnim } from "../../../../common";

import { BoardMarks } from "./BoardMarks";
import { BoardUnits } from "./BoardUnits";
import { BoardGhosts } from "./BoardGhosts";
import css from "./Board.cssProxy";

const noop = () => {};

type BoardProps = {
  graphics: AlgolGameGraphics;
  units: { [id: string]: AlgolUnitState };
  marks: AlgolPosition[];
  potentialMarks: AlgolPosition[];
  callback?: (pos: string) => void;
  anim?: AlgolAnimCompiled;
  active?: boolean; // Whether or not we want the user to be able to make choices in the board
  name?: string;
};

const EMPTYARR: any[] = [];

export const Board: React.FunctionComponent<BoardProps> = memo(
  ({
    graphics,
    marks,
    potentialMarks,
    units,
    callback = noop,
    active,
    anim = emptyAnim,
    name = "basic",
  }) => {
    const { boards, icons } = graphics;
    const { dataURI, height, width } = boards[name];
    const styles = useMemo(
      () => ({
        background: `url("${dataURI}")`,
      }),
      [dataURI]
    );
    return (
      <div style={styles} className={css.boardContainer}>
        <div
          style={{
            position: "absolute",
            top: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <BoardMarks
            callback={callback}
            width={width}
            height={height}
            marks={active ? marks : EMPTYARR}
            potentialMarks={active ? potentialMarks : EMPTYARR}
            units={units}
          />

          <BoardUnits
            width={width}
            height={height}
            marks={marks}
            potentialMarks={potentialMarks}
            units={units}
            anim={anim}
            iconMapper={icons}
          />

          <BoardGhosts width={width} height={height} ghosts={anim.ghosts} />
        </div>
      </div>
    );
  }
);
