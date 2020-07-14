// File generated by 'npm run export'

import { BombardmentDefinition } from "./_types";

import bombardmentAI from "./ai";
import bombardmentAnim from "./anim";
import bombardmentBoardBook from "./boards";
import bombardmentSetupBook from "./setups";
import bombardmentGraphics from "./graphics";
import bombardmentInstruction from "./instructions";
import bombardmentMeta from "./meta";
import bombardmentPerformance from "./performance";
import bombardmentFlow from "./flow";
import bombardmentScripts from "./scripts";
import bombardmentGenerators from "./generators";
import bombardmentVariants from "./variants";

const bombardmentDefinition: BombardmentDefinition = {
  AI: bombardmentAI,
  anim: bombardmentAnim,
  boards: bombardmentBoardBook,
  setups: bombardmentSetupBook,
  graphics: bombardmentGraphics,
  instructions: bombardmentInstruction,
  generators: bombardmentGenerators,
  meta: bombardmentMeta,
  performance: bombardmentPerformance,
  flow: bombardmentFlow,
  scripts: bombardmentScripts,
  variants: bombardmentVariants
};

export default bombardmentDefinition;

export * from "./_types";
