import {
  AlgolInstrAnon,
  AlgolInstrLineAnon,
  AlgolInstrUnitAtAnon,
  AlgolInstrOrListAnon,
  AlgolInstrPluralizeAnon,
  AlgolInstrPosAnon,
  AlgolInstrValAnon
} from "./instr.anon";

export function isAlgolInstrVal(
  expr: AlgolInstrAnon
): expr is AlgolInstrValAnon {
  return (expr as AlgolInstrValAnon).value !== undefined;
}

export function isAlgolInstrPluralize(
  expr: AlgolInstrAnon
): expr is AlgolInstrPluralizeAnon {
  return (expr as AlgolInstrPluralizeAnon).pluralize !== undefined;
}

export function isAlgolInstrPos(
  expr: AlgolInstrAnon
): expr is AlgolInstrPosAnon {
  return (expr as AlgolInstrPosAnon).pos !== undefined;
}

export function isAlgolInstrUnitAt(
  expr: AlgolInstrAnon
): expr is AlgolInstrUnitAtAnon {
  return (expr as AlgolInstrUnitAtAnon).unitat !== undefined;
}

export function isAlgolInstrLine(
  expr: AlgolInstrAnon
): expr is AlgolInstrLineAnon {
  return (expr as AlgolInstrLineAnon).line !== undefined;
}

export function isAlgolInstrOrList(
  expr: AlgolInstrAnon
): expr is AlgolInstrOrListAnon {
  return (expr as AlgolInstrOrListAnon).orlist !== undefined;
}
