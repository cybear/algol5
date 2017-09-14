import * as isArray from 'lodash/isArray';
import * as tail from 'lodash/tail';

import { Definition } from '../types';
import withUniversal from './universal';
import {layerRef} from '../common';
import position from './position';
import value from './value';

function innerSet(gameDef: Definition, player: 1 | 2, action: string, expression){
  if (!isArray(expression)){
    return layerRef(gameDef, player, action, expression);
  }
  const [type, ...details] = expression;
  switch(type){
    case "layer": {
      const [layerName] = details;
      return layerRef(gameDef, player, action, layerName);
    }
    case "single": {
      const [pos] = details;
      return `
        (function(){
            var ret = {};
            ret[${position(gameDef,player,action,pos)}]=1;
            return ret;
        }())`;
    }
    case "union": {
      const sets = details;
      let ret = '',
          setdefs = sets.map((def,n)=>'s'+n+' = '+set(gameDef,player,action,def)).join(', '),
          copies = sets.map((def,n)=>'for(k in s'+n+'){ret[k]=1;}').join(' ');
      return `
        (function(){
            var k, ret={}, ${setdefs};
            ${copies}
            return ret;
        }())`;
    }
    case "intersect": {
      const sets = details;
      let ret = '',
          setdefs = sets.map((def,n)=>'s'+n+' = '+set(gameDef,player,action,def)).join(', '),
          test = tail(sets).map((def,n)=>'s'+(n+1)+'[key]').join(' && ');
      return `
        (function(){
          var ret={}, ${setdefs};
          for(var key in s0){
            if (${test}){
              ret[key]=s0[key];
            }
          }
          return ret;
        }())`;
    }
    case "subtract": {
      const sets = details;
      let ret = '',
          setdefs = sets.map((def,n)=>'s'+n+' = '+set(gameDef,player,action,def)).join(', '),
          test = tail(sets).map((def,n)=>'!s'+(n+1)+'[key]').join(' && ');
      return `
        (function(){
          var ret={}, ${setdefs};
          for(var key in s0){
            if (${test}){
              ret[key]=s0[key];
            }
          }
          return ret;
        }())`;
    }
    case "unitlayer": { // TODO - anyone ever using this?
      const [layerName] = details;
      return 'UNITLAYERS['+value(gameDef,player,action,layerName)+']';
    }
    default:
      console.log("Unknown set", expression);
      throw "UNKNOWN SET DEF! " + expression;
  }
}

const set = withUniversal(innerSet);

export default set;
