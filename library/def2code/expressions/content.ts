import * as isArray from 'lodash/isArray';

import { Definition } from '../types';
import makeParser from './';

export default function parseContent(gameDef: Definition, player: 1 | 2, action: string, expression, from){
  const parse = makeParser(gameDef, player, action, "id");
  if (typeof expression === 'string'){
    if (gameDef.commands[expression] || expression === 'endturn'){
      return parse.content(['cmnd',expression]);
    } else if (gameDef.marks[expression]){
      return parse.content(['pos',expression]);
    } else {
      return parse.content(['text',expression]);
    }
  } else if (typeof expression === 'number'){
    return parse.content(['text',expression]);
  } else if (!isArray(expression)){
    console.log("WEIRD",expression);
    throw "Weird content expression format: " + expression;
  }
  const [type, ...args] = expression;
  switch(type){
    case "if": {
      const [cond,then] = args;
      return `${parse.bool(cond)} ? ${parse.content(then)} : {type:'nothing'}`;
    }
    case "line": {
      return `collapseLine({
        type: 'line',
        content: [${ args.map(p => parse.content(p)).join(', ') }]
      })`;
    }
    case "text": {
      const [text] = args;
      return `{type:'text',text:${parse.value(text)}}`;
    }
    case "pos": {
      const [pos] = args;
      return `{type:'posref',pos:${parse.pos(pos)}}`;
    }
    case "player": {
      const [plr] = args;
      return `{type:'playerref',player:${parse.val(plr)}}`;
    }
    case "cmnd": {
      const [cmnd] = args;
      return `{type:'cmndref',cmnd:${parse.val(cmnd)}}`;
    }
    case "orlist": {
      return `[${args.map(([cond,content]) => `{cond: ${parse.bool(cond)}, content: ${parse.content(content)}}`)}].filter(function(elem){
        return elem.cond;
      }).reduce(function(mem, elem, n, list){
        mem.content.push(elem.content);
        if (n === list.length - 2){
          mem.content.push("or");
        } else if (n < list.length - 2){
          mem.content.push(",");
        }
        return mem;
      },{type:"line",content:[]})
      `
    }
    case "pluralise": {
      const [num,sing,plur] = args;
      return `{
        type: "text",
        text: (temp = ${parse.val(num)}) + ' ' + ( temp === 1 ? ${parse.val(sing)} : ${parse.val(plur)})
      }`;
    }
    default:
      try {
        return `{
          type: 'text',
          text: ${parse.val(expression)}
        }`
      } catch(e){
         return parse.content(["line", ...expression]);
      }
  }
}