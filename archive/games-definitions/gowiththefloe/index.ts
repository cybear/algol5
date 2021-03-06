// File generated by 'npm run export'

import { GowiththefloeDefinition } from './_types';

import gowiththefloeAI from './ai';
import gowiththefloeBoard from './board';
import gowiththefloeSetup from './setup';
import gowiththefloeGraphics from './graphics';
import gowiththefloeInstruction from './instructions';
import gowiththefloeMeta from './meta';
import gowiththefloeFlow from './flow';
import gowiththefloeScripts from './scripts';
import gowiththefloeGenerators from './generators';

const gowiththefloeDefinition: GowiththefloeDefinition = {
  AI: gowiththefloeAI,
  board: gowiththefloeBoard,
  setup: gowiththefloeSetup,
  graphics: gowiththefloeGraphics,
  instructions: gowiththefloeInstruction,
  generators: gowiththefloeGenerators,
  meta: gowiththefloeMeta,
  flow: gowiththefloeFlow,
  scripts: gowiththefloeScripts,
};

export default gowiththefloeDefinition;

export * from './_types';
