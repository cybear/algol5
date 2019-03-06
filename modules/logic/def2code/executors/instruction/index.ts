export * from "./instruction.helpers";

import {
  FullDefAnon,
  AlgolInstrAnon,
  AlgolInstrInnerAnon,
  isAlgolInstrLine,
  isAlgolInstrOrList,
  isAlgolInstrVal
} from "../../../../types";

import { executeExpression, makeParser } from "../";

export function executeInstruction(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  instr: AlgolInstrAnon
): string {
  return executeExpression(
    gameDef,
    player,
    action,
    executeInstructionInner,
    instr,
    "instr"
  );
}

function executeInstructionInner(
  gameDef: FullDefAnon,
  player: 1 | 2,
  action: string,
  instr: AlgolInstrInnerAnon
): string {
  const exprParser = makeParser(gameDef, player, action);

  if (!instr) {
    return "undefined";
  }
  if (typeof instr === "number") {
    return `{ text: ${instr} }`;
  }
  if (typeof instr === "string") {
    if (gameDef.flow.commands[instr]) {
      return `{ command: "${instr}" }`;
    }
    if (gameDef.flow.marks[instr]) {
      return `{ pos: MARKS.${instr} }`;
    }
    return `{ text: "${instr}" }`;
  }
  if (isAlgolInstrLine(instr)) {
    return `collapseContent({ line: [ ${instr.line
      .map(i => executeInstruction(gameDef, player, action, i))
      .filter(i => i && i !== "undefined")
      .join(", ")} ] })`;
  }
  if (isAlgolInstrOrList(instr)) {
    return `collapseContent({ line: [ ${instr.orlist.map(i =>
      executeInstruction(gameDef, player, action, i)
    )} ].filter(i => !!i).reduce((mem, i, n, list) => {
      mem.push(i);
      if (n === list.length - 2){
        mem.push({text: " or "});
      } else if (n < list.length - 2){
        mem.push({text: ", " });
      }
      return mem;
    }, []) })`;
  }
  if (isAlgolInstrVal(instr)) {
    return `{ text: ${exprParser.val(instr.value)} }`;
  }
  throw new Error("Unknown instruction: " + JSON.stringify(instr));
  return "";
}
