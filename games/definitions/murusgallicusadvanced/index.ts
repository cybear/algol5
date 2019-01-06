// File generated by 'npm run export'

import { FullDef } from '../../types';
import { MurusgallicusadvancedArtifactLayer, MurusgallicusadvancedCommand, MurusgallicusadvancedGenerator, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedPhase, MurusgallicusadvancedTerrain, MurusgallicusadvancedUnit } from './_types';

import murusgallicusadvancedAI from './ai';
import murusgallicusadvancedBoard from './board';
import murusgallicusadvancedSetup from './setup';
import murusgallicusadvancedGraphics from './graphics';
import murusgallicusadvancedInstruction from './instructions';
import murusgallicusadvancedMeta from './meta';
import murusgallicusadvancedFlow from './flow';
import murusgallicusadvancedScripts from './scripts';
import murusgallicusadvancedGenerators from './generators';

const murusgallicusadvancedFullDef: FullDef<MurusgallicusadvancedArtifactLayer, MurusgallicusadvancedCommand, MurusgallicusadvancedGenerator, MurusgallicusadvancedLayer, MurusgallicusadvancedMark, MurusgallicusadvancedPhase, MurusgallicusadvancedTerrain, MurusgallicusadvancedUnit> = {
  AI: murusgallicusadvancedAI,
  board: murusgallicusadvancedBoard,
  setup: murusgallicusadvancedSetup,
  graphics: murusgallicusadvancedGraphics,
  instructions: murusgallicusadvancedInstruction,
  generators: murusgallicusadvancedGenerators,
  meta: murusgallicusadvancedMeta,
  flow: murusgallicusadvancedFlow,
  scripts: murusgallicusadvancedScripts,
};

export default murusgallicusadvancedFullDef;

export * from './_types';