// File generated by 'npm run export'

import { MonkeyqueenDefinition } from "./_types";

import monkeyqueenAI from "./ai";
import monkeyqueenAnim from "./anim";
import monkeyqueenBoardBook from "./boards";
import monkeyqueenSetupBook from "./setups";
import monkeyqueenGraphics from "./graphics";
import monkeyqueenInstruction from "./instructions";
import monkeyqueenMeta from "./meta";
import monkeyqueenPerformance from "./performance";
import monkeyqueenFlow from "./flow";
import monkeyqueenScripts from "./scripts";
import monkeyqueenGenerators from "./generators";
import monkeyqueenVariants from "./variants";

const monkeyqueenDefinition: MonkeyqueenDefinition = {
  AI: monkeyqueenAI,
  anim: monkeyqueenAnim,
  boards: monkeyqueenBoardBook,
  setups: monkeyqueenSetupBook,
  graphics: monkeyqueenGraphics,
  instructions: monkeyqueenInstruction,
  generators: monkeyqueenGenerators,
  meta: monkeyqueenMeta,
  performance: monkeyqueenPerformance,
  flow: monkeyqueenFlow,
  scripts: monkeyqueenScripts,
  variants: monkeyqueenVariants
};

export default monkeyqueenDefinition;

export * from "./_types";
