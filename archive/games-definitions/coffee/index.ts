// File generated by 'npm run export'

import { CoffeeDefinition } from './_types';

import coffeeAI from './ai';
import coffeeBoard from './board';
import coffeeSetup from './setup';
import coffeeGraphics from './graphics';
import coffeeInstruction from './instructions';
import coffeeMeta from './meta';
import coffeeFlow from './flow';
import coffeeScripts from './scripts';
import coffeeGenerators from './generators';

const coffeeDefinition: CoffeeDefinition = {
  AI: coffeeAI,
  board: coffeeBoard,
  setup: coffeeSetup,
  graphics: coffeeGraphics,
  instructions: coffeeInstruction,
  generators: coffeeGenerators,
  meta: coffeeMeta,
  flow: coffeeFlow,
  scripts: coffeeScripts,
};

export default coffeeDefinition;

export * from './_types';
