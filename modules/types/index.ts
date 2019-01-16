export * from "./explanation";
export * from "./primitives";
export * from "./gamedef";
export * from "./session";
export * from "./generated";

export type SaveData = {
  gameId: string;
  turnNumber: number;
  moveIndexes: number[];
  battleId: string;
  ended?: boolean;
};

export type Coords = {
  x: number;
  y: number;
};

export type Player = {
  type: string;
  name: string;
};

export type PositionList = {
  pos: string;
  coords: Coords;
}[];

export type FunctionName = string;

export type Layer = {
  [posname: string]: Object; // object with whatever props u want
};

// ------------------------ FROM NEW ------------------------

export type CommonLayer =
  | "myunits"
  | "oppunits"
  | "neutralunits"
  | "units"
  | "board"
  | "light"
  | "dark";

export function typeSignature(type, gameId) {
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  return {
    Flow: [
      "BattlePos",
      "BattleVar",
      "Command",
      "Layer",
      "Mark",
      "TurnPos",
      "TurnVar"
    ],
    Graphics: ["Terrain", "Unit"],
    Instructions: ["Phase"],
    Board: ["Terrain"],
    Setup: ["Unit"],
    Generators: [
      "ArtifactLayer",
      "BattlePos",
      "BattleVar",
      "Command",
      "Generator",
      "Layer",
      "Mark",
      "TurnPos",
      "TurnVar"
    ],
    FullDef: [
      "ArtifactLayer",
      "BattlePos",
      "BattleVar",
      "Command",
      "Generator",
      "Layer",
      "Mark",
      "Phase",
      "Terrain",
      "TurnPos",
      "TurnVar",
      "Unit"
    ]
  }[type]
    .map(t => capId + t)
    .join(", ");
}