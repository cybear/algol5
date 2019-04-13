export * from "./terrain";
export * from "./grid";

import { TerrainDef } from "./terrain";
import { AlgolGrid } from "./grid";
import { AlgolOffset } from "./offset";

export type AlgolBoard<
  BoardHeight extends number,
  BoardWidth extends number,
  Grid extends string,
  Position extends string,
  Terrain extends string
> = {
  height: BoardHeight;
  width: BoardWidth;
  offsets?: AlgolOffset[];
  offset?: AlgolOffset;
  terrain?: { [terrain in Terrain]: TerrainDef<Position> };
  grids?: { [name in Grid]: AlgolGrid<BoardHeight, BoardWidth> };
};

export type BoardAnon = AlgolBoard<number, number, string, string, string>;
