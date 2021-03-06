// File generated by 'npm run export'

import { DuckpondDefinition } from "./_types";

import duckpondAI from "./ai";
import duckpondAnim from "./anim";
import duckpondBoardBook from "./boards";
import duckpondSetupBook from "./setups";
import duckpondGraphics from "./graphics";
import duckpondInstruction from "./instructions";
import duckpondMeta from "./meta";
import duckpondPerformance from "./performance";
import duckpondFlow from "./flow";
import duckpondScripts from "./scripts";
import duckpondGenerators from "./generators";
import duckpondVariants from "./variants";

const duckpondDefinition: DuckpondDefinition = {
  AI: duckpondAI,
  anim: duckpondAnim,
  boards: duckpondBoardBook,
  setups: duckpondSetupBook,
  graphics: duckpondGraphics,
  instructions: duckpondInstruction,
  generators: duckpondGenerators,
  meta: duckpondMeta,
  performance: duckpondPerformance,
  flow: duckpondFlow,
  scripts: duckpondScripts,
  variants: duckpondVariants
};

export default duckpondDefinition;

export * from "./_types";
