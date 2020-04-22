// File generated by 'npm run export'

import { NeutronDefinition } from "./_types";

import neutronAI from "./ai";
import neutronAnim from "./anim";
import neutronBoardBook from "./boards";
import neutronSetupBook from "./setups";
import neutronGraphics from "./graphics";
import neutronInstruction from "./instructions";
import neutronMeta from "./meta";
import neutronPerformance from "./performance";
import neutronFlow from "./flow";
import neutronScripts from "./scripts";
import neutronGenerators from "./generators";
import neutronVariants from "./variants";

const neutronDefinition: NeutronDefinition = {
  AI: neutronAI,
  anim: neutronAnim,
  boards: neutronBoardBook,
  setups: neutronSetupBook,
  graphics: neutronGraphics,
  instructions: neutronInstruction,
  generators: neutronGenerators,
  meta: neutronMeta,
  performance: neutronPerformance,
  flow: neutronFlow,
  scripts: neutronScripts,
  variants: neutronVariants
};

export default neutronDefinition;

export * from "./_types";
