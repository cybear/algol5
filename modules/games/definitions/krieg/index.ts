// File generated by 'npm run export'

import { KriegDefinition } from "./_types";

import kriegAI from "./ai";
import kriegAnim from "./anim";
import kriegBoard from "./board";
import kriegSetup from "./setup";
import kriegGraphics from "./graphics";
import kriegInstruction from "./instructions";
import kriegMeta from "./meta";
import kriegPerformance from "./performance";
import kriegFlow from "./flow";
import kriegScripts from "./scripts";
import kriegGenerators from "./generators";

const kriegDefinition: KriegDefinition = {
  AI: kriegAI,
  anim: kriegAnim,
  board: kriegBoard,
  setup: kriegSetup,
  graphics: kriegGraphics,
  instructions: kriegInstruction,
  generators: kriegGenerators,
  meta: kriegMeta,
  performance: kriegPerformance,
  flow: kriegFlow,
  scripts: kriegScripts
};

export default kriegDefinition;

export * from "./_types";
