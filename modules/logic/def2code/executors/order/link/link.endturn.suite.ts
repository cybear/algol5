import { executeOrder } from "../../../executors";
import { emptyFullDef } from "../../../../../common";
import { AlgolStatementSuite, AlgolOrderAnon } from "../../../../../types";

export const testSuite: AlgolStatementSuite<AlgolOrderAnon> = {
  title: "Link - EndTurn",
  func: executeOrder,
  defs: [
    {
      def: {
        ...emptyFullDef,
        flow: {
          ...emptyFullDef.flow,
          endGame: {
            conquer: {
              condition: { truthy: { turnvar: "won" } },
              show: { singles: ["marka1", "marka2"] }
            },
            surrender: {
              condition: { truthy: { turnvar: "lost" } },
              who: ["otherplayer"]
            },
            neither: {
              condition: { truthy: { turnvar: "draw" } },
              who: 0
            }
          }
        }
      },
      player: 1,
      action: "someaction",
      contexts: [
        {
          context: {
            TURNVARS: {},
            LINKS: {},
            newStepId: "foo",
            MARKS: {}
          },
          tests: [
            {
              expr: { links: ["endturn"] },
              asserts: [
                {
                  sample: "LINKS.endturn",
                  res: "start2",
                  desc: "we can link to endturn, passing over to next plr"
                }
              ]
            }
          ]
        },
        {
          context: {
            TURNVARS: { won: "yes" },
            LINKS: {
              endMarks: {}
            },
            newStepId: "foo",
            MARKS: { marka1: "a1", marka2: "a2" }
          },
          tests: [
            {
              expr: { links: ["endturn"] },
              asserts: [
                {
                  sample: "LINKS.endturn",
                  res: "win",
                  desc: "we can link to winning the game"
                },
                {
                  sample: "LINKS.endedBy",
                  res: "conquer"
                },
                {
                  sample: "LINKS.endMarks",
                  res: ["a1", "a2"]
                }
              ]
            }
          ]
        },
        {
          context: {
            TURNVARS: { lost: "yes" },
            LINKS: {},
            newStepId: "foo",
            MARKS: {}
          },
          tests: [
            {
              expr: { links: ["endturn"] },
              asserts: [
                {
                  sample: "LINKS.endturn",
                  res: "lose",
                  desc: "we can link to losing endturn"
                },
                {
                  sample: "LINKS.endedBy",
                  res: "surrender"
                }
              ]
            }
          ]
        },
        {
          context: {
            TURNVARS: { draw: "yes" },
            LINKS: {},
            newStepId: "foo",
            MARKS: {}
          },
          tests: [
            {
              expr: { links: ["endturn"] },
              asserts: [
                {
                  sample: "LINKS.endturn",
                  res: "draw",
                  desc: "we can link to draw endturn"
                },
                {
                  sample: "LINKS.endedBy",
                  res: "neither"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
