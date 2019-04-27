import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  terrainLayers,
  collapseContent,
  defaultInstruction
} from "../../common";
import { AlgolStepLinks, AlgolGame } from "../../types";
const emptyObj = {};
const BOARD = boardLayers({ height: 5, width: 5 });
const emptyArtifactLayers = { movetargets: {} };
const connections = boardConnections({ height: 5, width: 5 });
const relativeDirs = makeRelativeDirs([]);
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: Partial<AlgolGame> = {
  gameId: "uglyduck",
  action: {},
  instruction: {}
};
{
  const groupLayers = {
    soldiers: [
      ["units", "soldiers"],
      ["units", "myunits", "soldiers", "mysoldiers"],
      ["units", "oppunits", "soldiers", "oppsoldiers"]
    ],
    kings: [
      ["units"],
      ["units", "myunits", "mykings"],
      ["units", "oppunits", "oppkings"]
    ]
  };
  const TERRAIN = terrainLayers(
    5,
    5,
    {
      homerow: { "1": [{ rect: ["a1", "e1"] }], "2": [{ rect: ["a5", "e5"] }] }
    },
    1
  );
  game.action.startTurn1 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit1";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.instruction.startTurn1 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.mysoldiers).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: ["pawn", 1] },
                    { text: "to advance" }
                  ]
                })
              : undefined,
            Object.keys(UNITLAYERS.mykings).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: ["king", 1] },
                    { text: "to retreat" }
                  ]
                })
              : undefined
          ]
            .filter(i => !!i)
            .reduce((mem, i, n, list) => {
              mem.push(i);
              if (n === list.length - 2) {
                mem.push({ text: " or " });
              } else if (n < list.length - 2) {
                mem.push({ text: ", " });
              }
              return mem;
            }, [])
        })
      ]
    });
  };
  game.action.move1 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    if (TERRAIN.opphomerow[MARKS.selectmovetarget]) {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "kings"
          };
        }
      }
    }
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      mykings: {},
      oppkings: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.homerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endGame = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "swanhome";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.myhomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else {
      LINKS.endTurn = "startTurn2";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.instruction.move1 = () => defaultInstruction(1);
  game.action.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of UNITLAYERS.mykings[MARKS.selectunit]
        ? [4, 5, 6]
        : [8, 1, 2]) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (DIR === 1 || DIR === 5
            ? !UNITLAYERS.units[POS]
            : !UNITLAYERS.myunits[POS])
        ) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmovetarget1";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectunit1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return UNITLAYERS.mykings[MARKS.selectunit]
      ? collapseContent({
          line: [
            { select: "Select" },
            { text: "a square closer to home to move your" },
            { unittype: ["king", 1] },
            { text: "to" }
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { text: "a square closer to the enemy lines to move your" },
            { unittype: ["pawn", 1] },
            { text: "to" }
          ]
        });
  };
  game.action.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move1";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: step.MARKS.selectunit, selectmovetarget: newMarkPos }
    };
  };
  game.instruction.selectmovetarget1 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to" },
        UNITLAYERS.mykings[MARKS.selectunit]
          ? collapseContent({
              line: [{ text: "retreat your" }, { unittype: ["king", 1] }]
            })
          : collapseContent({
              line: [{ text: "advance your" }, { unittype: ["pawn", 1] }]
            }),
        { text: "from" },
        { pos: MARKS.selectunit },
        TERRAIN.opphomerow[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: "into the opponent base at" },
                { pos: MARKS.selectmovetarget }
              ]
            })
          : TERRAIN.myhomerow[MARKS.selectmovetarget]
          ? collapseContent({
              line: [{ text: "back home to" }, { pos: MARKS.selectmovetarget }]
            })
          : collapseContent({
              line: [{ text: "to" }, { pos: MARKS.selectmovetarget }]
            }),
        UNITLAYERS.oppunits[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: ", killing the enemy" },
                {
                  unit: [
                    { soldiers: "pawn", kings: "king" }[
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectmovetarget
                  ]
                }
              ]
            })
          : undefined
      ]
    });
  };
}
{
  const groupLayers = {
    soldiers: [
      ["units", "soldiers"],
      ["units", "oppunits", "soldiers", "oppsoldiers"],
      ["units", "myunits", "soldiers", "mysoldiers"]
    ],
    kings: [
      ["units"],
      ["units", "oppunits", "oppkings"],
      ["units", "myunits", "mykings"]
    ]
  };
  const TERRAIN = terrainLayers(
    5,
    5,
    {
      homerow: { "1": [{ rect: ["a1", "e1"] }], "2": [{ rect: ["a5", "e5"] }] }
    },
    2
  );
  game.action.startTurn2 = step => {
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings
    };
    let LINKS: AlgolStepLinks = {
      actions: {}
    };
    for (const pos of Object.keys(UNITLAYERS.myunits)) {
      LINKS.actions[pos] = "selectunit2";
    }
    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      UNITLAYERS,
      ARTIFACTS: emptyArtifactLayers,
      MARKS: {},
      TURN: step.TURN + 1
    };
  };
  game.instruction.startTurn2 = step => {
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { select: "Select" },
        collapseContent({
          line: [
            Object.keys(UNITLAYERS.mysoldiers).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: ["pawn", 2] },
                    { text: "to advance" }
                  ]
                })
              : undefined,
            Object.keys(UNITLAYERS.mykings).length !== 0
              ? collapseContent({
                  line: [
                    { text: "a" },
                    { unittype: ["king", 2] },
                    { text: "to retreat" }
                  ]
                })
              : undefined
          ]
            .filter(i => !!i)
            .reduce((mem, i, n, list) => {
              mem.push(i);
              if (n === list.length - 2) {
                mem.push({ text: " or " });
              } else if (n < list.length - 2) {
                mem.push({ text: ", " });
              }
              return mem;
            }, [])
        })
      ]
    });
  };
  game.newBattle = () => {
    let UNITDATA = deduceInitialUnitData({
      soldiers: { "1": [{ rect: ["a1", "e1"] }], "2": [{ rect: ["a5", "e5"] }] }
    });
    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      mykings: {},
      oppkings: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    return game.action.startTurn1({
      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.action.move2 = step => {
    let LINKS: AlgolStepLinks = { actions: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let MARKS = step.MARKS;
    if (TERRAIN.opphomerow[MARKS.selectmovetarget]) {
      {
        let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
        if (unitid) {
          UNITDATA[unitid] = {
            ...UNITDATA[unitid],
            group: "kings"
          };
        }
      }
    }
    delete UNITDATA[(UNITLAYERS.units[MARKS.selectmovetarget] || {}).id];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectmovetarget
        };
      }
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      mykings: {},
      oppkings: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      for (const layer of groupLayers[group][owner]) {
        UNITLAYERS[layer][pos] = currentunit;
      }
    }
    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.homerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endGame = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "swanhome";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.myhomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: emptyObj }), {})
      );
    } else {
      LINKS.endTurn = "startTurn1";
    }
    return {
      LINKS,
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN: step.TURN,
      UNITDATA,
      UNITLAYERS
    };
  };
  game.instruction.move2 = () => defaultInstruction(2);
  game.action.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      movetargets: {}
    };
    let LINKS: AlgolStepLinks = { actions: {} };
    let MARKS = {
      selectunit: newMarkPos
    };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of UNITLAYERS.mykings[MARKS.selectunit]
        ? [8, 1, 2]
        : [4, 5, 6]) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (DIR === 1 || DIR === 5
            ? !UNITLAYERS.units[POS]
            : !UNITLAYERS.myunits[POS])
        ) {
          ARTIFACTS.movetargets[POS] = emptyObj;
        }
      }
    }
    for (const pos of Object.keys(ARTIFACTS.movetargets)) {
      LINKS.actions[pos] = "selectmovetarget2";
    }
    return {
      LINKS,
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS
    };
  };
  game.instruction.selectunit2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return UNITLAYERS.mykings[MARKS.selectunit]
      ? collapseContent({
          line: [
            { select: "Select" },
            { text: "a square closer to home to move your" },
            { unittype: ["king", 2] },
            { text: "to" }
          ]
        })
      : collapseContent({
          line: [
            { select: "Select" },
            { text: "a square closer to the enemy lines to move your" },
            { unittype: ["pawn", 2] },
            { text: "to" }
          ]
        });
  };
  game.action.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS: AlgolStepLinks = { actions: {} };
    LINKS.actions.move = "move2";
    return {
      LINKS,
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { selectunit: step.MARKS.selectunit, selectmovetarget: newMarkPos }
    };
  };
  game.instruction.selectmovetarget2 = step => {
    let MARKS = step.MARKS;
    let UNITLAYERS = step.UNITLAYERS;
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to" },
        UNITLAYERS.mykings[MARKS.selectunit]
          ? collapseContent({
              line: [{ text: "retreat your" }, { unittype: ["king", 2] }]
            })
          : collapseContent({
              line: [{ text: "advance your" }, { unittype: ["pawn", 2] }]
            }),
        { text: "from" },
        { pos: MARKS.selectunit },
        TERRAIN.opphomerow[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: "into the opponent base at" },
                { pos: MARKS.selectmovetarget }
              ]
            })
          : TERRAIN.myhomerow[MARKS.selectmovetarget]
          ? collapseContent({
              line: [{ text: "back home to" }, { pos: MARKS.selectmovetarget }]
            })
          : collapseContent({
              line: [{ text: "to" }, { pos: MARKS.selectmovetarget }]
            }),
        UNITLAYERS.oppunits[MARKS.selectmovetarget]
          ? collapseContent({
              line: [
                { text: ", killing the enemy" },
                {
                  unit: [
                    { soldiers: "pawn", kings: "king" }[
                      (UNITLAYERS.units[MARKS.selectmovetarget] || {}).group
                    ],
                    (UNITLAYERS.units[MARKS.selectmovetarget] || {}).owner as
                      | 0
                      | 1
                      | 2,
                    MARKS.selectmovetarget
                  ]
                }
              ]
            })
          : undefined
      ]
    });
  };
}
export default game as AlgolGame;
