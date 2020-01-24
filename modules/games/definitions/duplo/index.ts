// File generated by 'npm run export'

import { DuploDefinition } from "./_types";

import duploAI from "./ai";
import duploAnim from "./anim";
import duploBoard from "./board";
import duploSetup from "./setup";
import duploGraphics from "./graphics";
import duploInstruction from "./instructions";
import duploMeta from "./meta";
import duploPerformance from "./performance";
import duploFlow from "./flow";
import duploScripts from "./scripts";
import duploGenerators from "./generators";

const duploDefinition: DuploDefinition = {
  AI: duploAI,
  anim: duploAnim,
  board: duploBoard,
  setup: duploSetup,
  graphics: duploGraphics,
  instructions: duploInstruction,
  generators: duploGenerators,
  meta: duploMeta,
  performance: duploPerformance,
  flow: duploFlow,
  scripts: duploScripts
};

export default duploDefinition;

export * from "./_types";
