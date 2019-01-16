import * as fs from "fs-extra";
import * as path from "path";

import fake from "./fake";

import { FullDef, typeSignature } from "../../../types";
import dateStamp from "./datestamp";

import { defPath } from "./_paths";

function ownify(u) {
  return [u, "my" + u, "neutral" + u, "opp" + u];
}

function possibles(def) {
  if (typeof def === "string") return [def];
  switch (def[0]) {
    case "ifplayer":
      return possibles(def[2]);
    case "playercase":
      return possibles(def[1]).concat(possibles(def[2]));
    case "if":
      return possibles(def[2]);
    case "ifelse":
      return possibles(def[2]).concat(possibles(def[3]));
    case "indexlist":
      return possibles(def[2]);
    default:
      return def;
  }
}

export default async function analyze(def: FullDef | string) {
  if (typeof def === "string") {
    await fake(def);
    def = require(path.join(defPath, def)).default as FullDef;
  }
  const gameId = def.meta.id;
  const gameDefPath = path.join(defPath, gameId);
  const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
  const { board, graphics, generators, flow } = def;
  const terrains = Object.keys(board.terrain || {});
  const units = Object.keys(graphics.icons);
  const marks = Object.keys(flow.marks);
  const commands = Object.keys(flow.commands);
  const nonEndCommands = commands.filter(
    c =>
      possibles(flow.commands[c].link).filter(l => l !== "endturn").length > 0
  );

  const unitLayers = units.reduce((mem, u) => mem.concat(ownify(u)), []);

  let terrainLayers = [];
  for (let tname of terrains) {
    const t = board.terrain[tname];
    terrainLayers.push(tname);
    terrainLayers.push("no" + tname);
    if (!Array.isArray(t)) {
      if (t[0]) terrainLayers.push("neutral" + tname);
      if (t[1] || t[2]) {
        terrainLayers.push("my" + tname);
        terrainLayers.push("opp" + tname);
      }
    }
  }

  const generatorNames = Object.keys(generators);
  let artifactLayers = [];

  for (let g of generatorNames) {
    const gen = generators[g];
    const draws = gen.type === "filter" ? { filter: gen } : gen.draw;
    for (let d of Object.keys(draws)) {
      const draw = draws[d];
      for (let l of possibles(draw.tolayer)) {
        if (draw.include && draw.include.owner) {
          artifactLayers = artifactLayers.concat(ownify(l));
        } else {
          artifactLayers = artifactLayers.concat(l);
        }
      }
    }
  }

  artifactLayers = artifactLayers.filter(
    (l, n) => artifactLayers.indexOf(l) === n
  );

  const analysis = `import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite, FullDef } from '../../../types';

export type ${capId}Terrain = ${
    terrains.length ? terrains.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}Unit = ${
    units.length ? units.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}Mark = ${
    marks.length ? marks.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}Command = ${
    commands.length ? commands.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}PhaseCommand = ${
    nonEndCommands.length
      ? nonEndCommands.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}Phase = "startTurn" | ${capId}Mark${
    nonEndCommands.length ? ` | ${capId}PhaseCommand` : ""
  };
export type ${capId}UnitLayer = ${
    unitLayers.length ? unitLayers.map(t => `"${t}"`).join(" | ") : "never"
  };
export type ${capId}Generator = ${
    generatorNames.length
      ? generatorNames.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}ArtifactLayer = ${
    artifactLayers.length
      ? artifactLayers.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}TerrainLayer = ${
    terrainLayers.length
      ? terrainLayers.map(t => `"${t}"`).join(" | ")
      : "never"
  };
export type ${capId}Layer = CommonLayer${
    unitLayers.length ? ` | ${capId}UnitLayer` : ""
  }${artifactLayers.length ? ` | ${capId}ArtifactLayer` : ""}${
    terrainLayers.length ? ` | ${capId}TerrainLayer` : ""
  };
export type ${capId}BattlePos = any;
export type ${capId}BattleVar = any;
export type ${capId}TurnPos = any;
export type ${capId}TurnVar = any;
 
export type ${capId}Generators = Generators<${typeSignature(
    "Generators",
    gameId
  )}>;
export type ${capId}Flow = Flow<${typeSignature("Flow", gameId)}>;
export type ${capId}Board = Board<${typeSignature("Board", gameId)}>;
export type ${capId}AI = AI;
export type ${capId}Graphics = Graphics<${typeSignature("Graphics", gameId)}>;
export type ${capId}Instructions = Instructions<${typeSignature(
    "Instructions",
    gameId
  )}>;
export type ${capId}Meta = Meta;
export type ${capId}Scripts = GameTestSuite;
export type ${capId}Setup = Setup<${typeSignature("Setup", gameId)}>;

export type ${capId}Definition = FullDef<${typeSignature("FullDef", gameId)}>;
`;

  await fs.writeFile(path.join(gameDefPath, "_types.ts"), analysis);
  console.log("Analysed", gameId);
  dateStamp();
}