// File generated by 'npm run export'

import { AmazonsDefinition } from './_types';

import amazonsAI from './ai';
import amazonsAnim from './anim';
import amazonsBoard from './board';
import amazonsSetup from './setup';
import amazonsGraphics from './graphics';
import amazonsInstruction from './instructions';
import amazonsMeta from './meta';
import amazonsPerformance from './performance';
import amazonsFlow from './flow';
import amazonsScripts from './scripts';
import amazonsGenerators from './generators';

const amazonsDefinition: AmazonsDefinition = {
  AI: amazonsAI,
  anim: amazonsAnim,
  board: amazonsBoard,
  setup: amazonsSetup,
  graphics: amazonsGraphics,
  instructions: amazonsInstruction,
  generators: amazonsGenerators,
  meta: amazonsMeta,
  performance: amazonsPerformance,
  flow: amazonsFlow,
  scripts: amazonsScripts,
};

export default amazonsDefinition;

export * from './_types';
