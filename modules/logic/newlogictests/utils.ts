import { FullDefAnon } from "../../types";
import makeParser from "../def2code2/expressions";
import * as _eval from "eval";

export const truthy = "TRUTHY";
export const falsy = "FALSY";

export type ParserTest<T> = {
  def: FullDefAnon;
  player: 1 | 2;
  action: string;
  contexts: ContextTest<T>[];
};

export type ContextTest<T> = {
  context: { [idx: string]: any };
  tests: ExpressionTest<T>[];
};

export type ExpressionTest<T> = {
  expr: T;
  sample?: string;
  res: any;
  debug?: boolean;
};

export const parserTester = <T>(type: "set" | "bool" | "val" | "pos") => (
  def: FullDefAnon,
  player: 1 | 2,
  action: string,
  input: T
) => {
  const parser: any = makeParser(def, player, action)[type];
  return parser(input);
};

export function run<T>(
  parserTests: ParserTest<T>[],
  func: (def: FullDefAnon, player: 1 | 2, action: string, input: T) => string,
  t
) {
  parserTests.forEach(parserTest =>
    parserTest.contexts.forEach(({ context, tests }) => {
      tests.forEach(({ expr, res, sample, debug }) => {
        const code = func(
          parserTest.def,
          parserTest.player,
          parserTest.action,
          expr
        );
        let error, result;
        try {
          result = _eval(
            sample
              ? `${code}; module.exports = ${sample};`
              : `module.exports = ${code};`,
            JSON.parse(JSON.stringify(context))
          );
        } catch (e) {
          console.log("KABOOM", code);
          throw e;
        }

        const processedResult =
          res === truthy || res === falsy ? !!result : result;
        const processedComparator =
          res === truthy ? true : res === falsy ? false : res;
        t[typeof res === "object" ? "deepEqual" : "equal"](
          processedResult,
          processedComparator,
          sample
            ? `Ran ${JSON.stringify(expr)} and evaluated ${JSON.stringify(
                sample
              )} to ${JSON.stringify(res)}`
            : `Evaluated ${JSON.stringify(expr)} to ${JSON.stringify(res)}`
        );
        if (debug) {
          console.log(
            "CODE",
            code,
            "exp",
            res,
            "pexp",
            processedComparator,
            "result",
            result,
            "presult",
            processedResult
          );
        }
      });
    })
  );
}
