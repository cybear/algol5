import { runGameScript } from "./runGameScript";

import amazonsGame from "../generated/amazons";
import amazonsDef from "../../games/dist/games/amazons";
runGameScript("amazons", amazonsGame, amazonsDef.scripts);

import ariesGame from "../generated/aries";
import ariesDef from "../../games/dist/games/aries";
runGameScript("aries", ariesGame, ariesDef.scripts);

import atriumGame from "../generated/atrium";
import atriumDef from "../../games/dist/games/atrium";
runGameScript("atrium", atriumGame, atriumDef.scripts);

import coffeeGame from "../generated/coffee";
import coffeeDef from "../../games/dist/games/coffee";
runGameScript("coffee", coffeeGame, coffeeDef.scripts);

import daggersGame from "../generated/daggers";
import daggersDef from "../../games/dist/games/daggers";
runGameScript("daggers", daggersGame, daggersDef.scripts);

import descentGame from "../generated/descent";
import descentDef from "../../games/dist/games/descent";
runGameScript("descent", descentGame, descentDef.scripts);

import duploGame from "../generated/duplo";
import duploDef from "../../games/dist/games/duplo";
runGameScript("duplo", duploGame, duploDef.scripts);

import jostleGame from "../generated/jostle";
import jostleDef from "../../games/dist/games/jostle";
runGameScript("jostle", jostleGame, jostleDef.scripts);

import kickrunGame from "../generated/kickrun";
import kickrunDef from "../../games/dist/games/kickrun";
runGameScript("kickrun", kickrunGame, kickrunDef.scripts);

import kriegGame from "../generated/krieg";
import kriegDef from "../../games/dist/games/krieg";
runGameScript("krieg", kriegGame, kriegDef.scripts);

import murusgallicusGame from "../generated/murusgallicus";
import murusgallicusDef from "../../games/dist/games/murusgallicus";
runGameScript("murusgallicus", murusgallicusGame, murusgallicusDef.scripts);

import murusgallicusadvancedGame from "../generated/murusgallicusadvanced";
import murusgallicusadvancedDef from "../../games/dist/games/murusgallicusadvanced";
runGameScript(
  "murusgallicusadvanced",
  murusgallicusadvancedGame,
  murusgallicusadvancedDef.scripts
);

import orthokonGame from "../generated/orthokon";
import orthokonDef from "../../games/dist/games/orthokon";
runGameScript("orthokon", orthokonGame, orthokonDef.scripts);

import semaphorGame from "../generated/semaphor";
import semaphorDef from "../../games/dist/games/semaphor";
runGameScript("semaphor", semaphorGame, semaphorDef.scripts);

import serauqsGame from "../generated/serauqs";
import serauqsDef from "../../games/dist/games/serauqs";
runGameScript("serauqs", serauqsGame, serauqsDef.scripts);

// import shoveoffGame from "../generated/shoveoff";
// import shoveoffDef from "../../games/dist/games/shoveoff";
// runGameScript("shoveoff", shoveoffGame, shoveoffDef.scripts);

import transetGame from "../generated/transet";
import transetDef from "../../games/dist/games/transet";
runGameScript("transet", transetGame, transetDef.scripts);

import uglyduckGame from "../generated/uglyduck";
import uglyduckDef from "../../games/dist/games/uglyduck";
runGameScript("uglyduck", uglyduckGame, uglyduckDef.scripts);
