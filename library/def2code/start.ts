import lib from '../logic/';

import { Definition } from './types';

import {ifCodeContains} from './utils';

export default function addStartFunction(def: Definition, player: 1 | 2){
  const O = {rules: def, player};
  const instruction = lib.value(O, def.startTurn && def.startTurn.instruction||'');
  return `
    game.start${O.player} = function(turn,step){
      var turn = {
        steps: {},
        player: player,
        turn: turn.turn+1,
        links: {root:{}}
      };

      var MARKS = {}; 
      var ARTIFACTS = ${lib.blankArtifactLayers(O)}; 
      var UNITDATA = step.UNITDATA;
      ${lib.usesTurnVars(O) ? 'var TURNVARS = {}; ' : ''}
      ${lib.calculateUnitLayers({...O,defineUnitlayers:true})}

      ${lib.applyGeneratorInstructions(O,lib.startRules(O))}
      var newstep = turn.steps.root = {
        ARTIFACTS: ARTIFACTS,
        UNITDATA: UNITDATA,
        UNITLAYERS: UNITLAYERS,
        MARKS: MARKS,
        stepid: 'root',
        name: 'start',
        ${lib.contains((O && O.rules || {}),'spawn') ? 'clones: step.clones, ' : ''}
        path: []
        ${lib.usesTurnVars(O) ? ',TURNVARS: TURNVARS ' : ''}
      };
      ${lib.applyLinkInstructions({...O,root:true},lib.startRules(O))}
      return turn;
    }
    game.start${O.player}instruction = function(step){
      ${ifCodeContains(instruction,{
        MARKS: 'var MARKS = step.MARKS; ',
        ARTIFACTS: 'var ARTIFACTS = step.ARTIFACTS; ',
        UNITLAYERS: 'var UNITLAYERS = step.UNITLAYERS; ',
        UNITDATA: 'var UNITDATA = step.UNITDATA; ',
      })}
      return ${instruction};
    };
  `;
}
