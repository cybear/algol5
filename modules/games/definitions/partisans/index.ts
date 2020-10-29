// File generated by 'npm run export'

import { PartisansDefinition } from "./_types";

import partisansAI from "./ai";
import partisansAnim from "./anim";
import partisansBoardBook from "./boards";
import partisansSetupBook from "./setups";
import partisansGraphics from "./graphics";
import partisansInstruction from "./instructions";
import partisansMeta from "./meta";
import partisansPerformance from "./performance";
import partisansFlow from "./flow";
import partisansScripts from "./scripts";
import partisansGenerators from "./generators";
import partisansVariants from "./variants";

const partisansDefinition: PartisansDefinition = {
  AI: partisansAI,
  anim: partisansAnim,
  boards: partisansBoardBook,
  setups: partisansSetupBook,
  graphics: partisansGraphics,
  instructions: partisansInstruction,
  generators: partisansGenerators,
  meta: partisansMeta,
  performance: partisansPerformance,
  flow: partisansFlow,
  scripts: partisansScripts,
  variants: partisansVariants
};

export default partisansDefinition;

export * from "./_types";
