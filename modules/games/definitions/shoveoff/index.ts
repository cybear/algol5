// File generated by 'npm run export'

import { ShoveoffDefinition } from './_types';

import shoveoffAI from './ai';
import shoveoffBoard from './board';
import shoveoffSetup from './setup';
import shoveoffGraphics from './graphics';
import shoveoffInstruction from './instructions';
import shoveoffMeta from './meta';
import shoveoffFlow from './flow';
import shoveoffScripts from './scripts';
import shoveoffGenerators from './generators';

const shoveoffDefinition: ShoveoffDefinition = {
  AI: shoveoffAI,
  board: shoveoffBoard,
  setup: shoveoffSetup,
  graphics: shoveoffGraphics,
  instructions: shoveoffInstruction,
  generators: shoveoffGenerators,
  meta: shoveoffMeta,
  flow: shoveoffFlow,
  scripts: shoveoffScripts,
};

export default shoveoffDefinition;

export * from './_types';
