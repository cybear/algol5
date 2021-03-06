// File generated by 'npm run export'

import { SerauqsDefinition } from "./_types";

import serauqsAI from "./ai";
import serauqsAnim from "./anim";
import serauqsBoardBook from "./boards";
import serauqsSetupBook from "./setups";
import serauqsGraphics from "./graphics";
import serauqsInstruction from "./instructions";
import serauqsMeta from "./meta";
import serauqsPerformance from "./performance";
import serauqsFlow from "./flow";
import serauqsScripts from "./scripts";
import serauqsGenerators from "./generators";
import serauqsVariantsBook from "./variants";

const serauqsDefinition: SerauqsDefinition = {
  AI: serauqsAI,
  anim: serauqsAnim,
  boards: serauqsBoardBook,
  setups: serauqsSetupBook,
  graphics: serauqsGraphics,
  instructions: serauqsInstruction,
  generators: serauqsGenerators,
  meta: serauqsMeta,
  performance: serauqsPerformance,
  flow: serauqsFlow,
  scripts: serauqsScripts,
  variants: serauqsVariantsBook
};

export default serauqsDefinition;

export * from "./_types";
