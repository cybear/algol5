// File generated by 'npm run export'

import { SpeedsoccolotDefinition } from "./_types";

import speedsoccolotAI from "./ai";
import speedsoccolotAnim from "./anim";
import speedsoccolotBoardBook from "./boards";
import speedsoccolotSetupBook from "./setups";
import speedsoccolotGraphics from "./graphics";
import speedsoccolotInstruction from "./instructions";
import speedsoccolotMeta from "./meta";
import speedsoccolotPerformance from "./performance";
import speedsoccolotFlow from "./flow";
import speedsoccolotScripts from "./scripts";
import speedsoccolotGenerators from "./generators";
import speedsoccolotVariants from "./variants";

const speedsoccolotDefinition: SpeedsoccolotDefinition = {
  AI: speedsoccolotAI,
  anim: speedsoccolotAnim,
  boards: speedsoccolotBoardBook,
  setups: speedsoccolotSetupBook,
  graphics: speedsoccolotGraphics,
  instructions: speedsoccolotInstruction,
  generators: speedsoccolotGenerators,
  meta: speedsoccolotMeta,
  performance: speedsoccolotPerformance,
  flow: speedsoccolotFlow,
  scripts: speedsoccolotScripts,
  variants: speedsoccolotVariants
};

export default speedsoccolotDefinition;

export * from "./_types";
