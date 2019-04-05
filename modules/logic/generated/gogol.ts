import {
  offsetPos,
  boardConnections,
  makeRelativeDirs,
  deduceInitialUnitData,
  boardLayers,
  collapseContent
} from "/Users/davidwaller/gitreps/algol5/modules/common";

const BOARD = boardLayers({ height: 8, width: 8 });

const connections = boardConnections({ height: 8, width: 8 });
const relativeDirs = makeRelativeDirs();
const roseDirs = [1, 2, 3, 4, 5, 6, 7, 8];
const orthoDirs = [1, 3, 5, 7];
const diagDirs = [2, 4, 6, 8];
let game: any = {};
type Links = {
  endturn?: "win" | "lose" | "draw" | "start1" | "start2";
  endMarks?: string[];
  endedBy?: "infiltration" | "kingkill" | "starvation";
  commands: {
    deploy?: "deploy1" | "deploy2";
    move?: "move1" | "move2";
    jump?: "jump1" | "jump2";
  };
  marks: {
    selectkingdeploy?: {
      func: "selectkingdeploy1" | "selectkingdeploy2";
      pos: string[];
    };
    selectunit?: { func: "selectunit1" | "selectunit2"; pos: string[] };
    selectmovetarget?: {
      func: "selectmovetarget1" | "selectmovetarget2";
      pos: string[];
    };
    selectjumptarget?: {
      func: "selectjumptarget1" | "selectjumptarget2";
      pos: string[];
    };
  };
};
{
  const ownerNames = ["neutral", "my", "opp"];
  const TERRAIN = {
    homerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      f1: { pos: "f1", x: 6, y: 1, owner: 1 },
      g1: { pos: "g1", x: 7, y: 1, owner: 1 },
      h1: { pos: "h1", x: 8, y: 1, owner: 1 },
      a8: { pos: "a8", x: 1, y: 8, owner: 2 },
      b8: { pos: "b8", x: 2, y: 8, owner: 2 },
      c8: { pos: "c8", x: 3, y: 8, owner: 2 },
      d8: { pos: "d8", x: 4, y: 8, owner: 2 },
      e8: { pos: "e8", x: 5, y: 8, owner: 2 },
      f8: { pos: "f8", x: 6, y: 8, owner: 2 },
      g8: { pos: "g8", x: 7, y: 8, owner: 2 },
      h8: { pos: "h8", x: 8, y: 8, owner: 2 }
    },
    myhomerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      f1: { pos: "f1", x: 6, y: 1, owner: 1 },
      g1: { pos: "g1", x: 7, y: 1, owner: 1 },
      h1: { pos: "h1", x: 8, y: 1, owner: 1 }
    },
    opphomerow: {
      a8: { pos: "a8", x: 1, y: 8, owner: 2 },
      b8: { pos: "b8", x: 2, y: 8, owner: 2 },
      c8: { pos: "c8", x: 3, y: 8, owner: 2 },
      d8: { pos: "d8", x: 4, y: 8, owner: 2 },
      e8: { pos: "e8", x: 5, y: 8, owner: 2 },
      f8: { pos: "f8", x: 6, y: 8, owner: 2 },
      g8: { pos: "g8", x: 7, y: 8, owner: 2 },
      h8: { pos: "h8", x: 8, y: 8, owner: 2 }
    },
    edges: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      a5: { pos: "a5", x: 1, y: 5 },
      a6: { pos: "a6", x: 1, y: 6 },
      a7: { pos: "a7", x: 1, y: 7 },
      a8: { pos: "a8", x: 1, y: 8 },
      h1: { pos: "h1", x: 8, y: 1 },
      h2: { pos: "h2", x: 8, y: 2 },
      h3: { pos: "h3", x: 8, y: 3 },
      h4: { pos: "h4", x: 8, y: 4 },
      h5: { pos: "h5", x: 8, y: 5 },
      h6: { pos: "h6", x: 8, y: 6 },
      h7: { pos: "h7", x: 8, y: 7 },
      h8: { pos: "h8", x: 8, y: 8 },
      b8: { pos: "b8", x: 2, y: 8 },
      c8: { pos: "c8", x: 3, y: 8 },
      d8: { pos: "d8", x: 4, y: 8 },
      e8: { pos: "e8", x: 5, y: 8 },
      f8: { pos: "f8", x: 6, y: 8 },
      g8: { pos: "g8", x: 7, y: 8 },
      b1: { pos: "b1", x: 2, y: 1 },
      c1: { pos: "c1", x: 3, y: 1 },
      d1: { pos: "d1", x: 4, y: 1 },
      e1: { pos: "e1", x: 5, y: 1 },
      f1: { pos: "f1", x: 6, y: 1 },
      g1: { pos: "g1", x: 7, y: 1 }
    },
    nohomerow: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      a5: { pos: "a5", x: 1, y: 5 },
      a6: { pos: "a6", x: 1, y: 6 },
      a7: { pos: "a7", x: 1, y: 7 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      b5: { pos: "b5", x: 2, y: 5 },
      b6: { pos: "b6", x: 2, y: 6 },
      b7: { pos: "b7", x: 2, y: 7 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      c5: { pos: "c5", x: 3, y: 5 },
      c6: { pos: "c6", x: 3, y: 6 },
      c7: { pos: "c7", x: 3, y: 7 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      d5: { pos: "d5", x: 4, y: 5 },
      d6: { pos: "d6", x: 4, y: 6 },
      d7: { pos: "d7", x: 4, y: 7 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 },
      e5: { pos: "e5", x: 5, y: 5 },
      e6: { pos: "e6", x: 5, y: 6 },
      e7: { pos: "e7", x: 5, y: 7 },
      f2: { pos: "f2", x: 6, y: 2 },
      f3: { pos: "f3", x: 6, y: 3 },
      f4: { pos: "f4", x: 6, y: 4 },
      f5: { pos: "f5", x: 6, y: 5 },
      f6: { pos: "f6", x: 6, y: 6 },
      f7: { pos: "f7", x: 6, y: 7 },
      g2: { pos: "g2", x: 7, y: 2 },
      g3: { pos: "g3", x: 7, y: 3 },
      g4: { pos: "g4", x: 7, y: 4 },
      g5: { pos: "g5", x: 7, y: 5 },
      g6: { pos: "g6", x: 7, y: 6 },
      g7: { pos: "g7", x: 7, y: 7 },
      h2: { pos: "h2", x: 8, y: 2 },
      h3: { pos: "h3", x: 8, y: 3 },
      h4: { pos: "h4", x: 8, y: 4 },
      h5: { pos: "h5", x: 8, y: 5 },
      h6: { pos: "h6", x: 8, y: 6 },
      h7: { pos: "h7", x: 8, y: 7 }
    },
    noedges: {
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      b5: { pos: "b5", x: 2, y: 5 },
      b6: { pos: "b6", x: 2, y: 6 },
      b7: { pos: "b7", x: 2, y: 7 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      c5: { pos: "c5", x: 3, y: 5 },
      c6: { pos: "c6", x: 3, y: 6 },
      c7: { pos: "c7", x: 3, y: 7 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      d5: { pos: "d5", x: 4, y: 5 },
      d6: { pos: "d6", x: 4, y: 6 },
      d7: { pos: "d7", x: 4, y: 7 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 },
      e5: { pos: "e5", x: 5, y: 5 },
      e6: { pos: "e6", x: 5, y: 6 },
      e7: { pos: "e7", x: 5, y: 7 },
      f2: { pos: "f2", x: 6, y: 2 },
      f3: { pos: "f3", x: 6, y: 3 },
      f4: { pos: "f4", x: 6, y: 4 },
      f5: { pos: "f5", x: 6, y: 5 },
      f6: { pos: "f6", x: 6, y: 6 },
      f7: { pos: "f7", x: 6, y: 7 },
      g2: { pos: "g2", x: 7, y: 2 },
      g3: { pos: "g3", x: 7, y: 3 },
      g4: { pos: "g4", x: 7, y: 4 },
      g5: { pos: "g5", x: 7, y: 5 },
      g6: { pos: "g6", x: 7, y: 6 },
      g7: { pos: "g7", x: 7, y: 7 }
    }
  };
  game.start1 = step => {
    let ARTIFACTS = {
      nokings: {},
      nosoldiers: {},
      kingwalk: {},
      adjacentenemies: {},
      splashed: {},
      willdie: {},
      jumptargets: {}
    };
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      neutralkings: oldUnitLayers.neutralkings,
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers,
      neutralsoldiers: oldUnitLayers.neutralsoldiers
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };
    let TURN = step.TURN + 1;

    for (let STARTPOS in Object.entries(
      Object.keys(TERRAIN.edges)
        .concat(Object.keys(UNITLAYERS.mysoldiers))
        .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
    )
      .filter(([key, n]) => n === 2)
      .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})) {
      let startconnections = connections[STARTPOS];
      for (let DIR of TERRAIN.homerow[STARTPOS] ? orthoDirs : [1, 5]) {
        let POS = startconnections[DIR];
        if (POS) {
          ARTIFACTS.nokings[POS] = {};
        }
      }
    }

    for (let STARTPOS in UNITLAYERS.mykings) {
      let startconnections = connections[STARTPOS];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (TERRAIN.homerow[POS] ||
            (TERRAIN.edges[STARTPOS] && TERRAIN.edges[POS]))
        ) {
          ARTIFACTS.nosoldiers[POS] = {};
        }
      }
    }
    if (TURN > 2) {
      LINKS.marks.selectunit = {
        func: "selectunit1",
        pos: Object.keys(UNITLAYERS.myunits)
      };
    } else {
      LINKS.marks.selectkingdeploy = {
        func: "selectkingdeploy1",
        pos: Object.keys(
          Object.keys(BOARD.board)
            .filter(
              k =>
                !{ ...UNITLAYERS.units, ...ARTIFACTS.nokings }.hasOwnProperty(k)
            )
            .reduce((m, k) => ({ ...m, [k]: {} }), {})
        )
      };
    }

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS,
      MARKS: {},
      TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.start1instruction = step => {
    let TURN = step.TURN;

    return TURN > 2
      ? { text: "Select a unit to move" }
      : collapseContent({
          line: [{ text: "Select where to deploy your" }, { unittype: "king" }]
        });
  };
  game.deploy1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let TURN = step.TURN;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectkingdeploy,
        id: newunitid,
        group: "kings",
        owner: 1
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else if (TURN > 2 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      path: step.path.concat("deploy"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.move1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let TURN = step.TURN;
    let MARKS = step.MARKS;
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
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else if (TURN > 2 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      path: step.path.concat("move"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.jump1 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: step.ARTIFACTS.kingwalk,
      adjacentenemies: step.ARTIFACTS.adjacentenemies,
      splashed: step.ARTIFACTS.splashed,
      willdie: step.ARTIFACTS.willdie,
      jumptargets: step.ARTIFACTS.jumptargets
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let TURN = step.TURN;
    let MARKS = step.MARKS;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).id
    ];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectjumptarget
        };
      }
    }

    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else if (TURN > 2 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 1;
      LINKS.endturn = winner === 1 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endturn = "start2";
    }
    return {
      LINKS,
      path: step.path.concat("jump"),
      MARKS: {},
      ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectkingdeploy1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.deploy = "deploy1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectkingdeploy",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectkingdeploy: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectkingdeploy1instruction = step => {
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "deploy" },
        { text: "to place your king here" }
      ]
    });
  };
  game.selectunit1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: { ...step.ARTIFACTS.kingwalk },
      adjacentenemies: { ...step.ARTIFACTS.adjacentenemies },
      splashed: step.ARTIFACTS.splashed,
      willdie: { ...step.ARTIFACTS.willdie },
      jumptargets: { ...step.ARTIFACTS.jumptargets }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      for (let STARTPOS in {
        ...UNITLAYERS.mykings,
        ...{ [MARKS.selectunit]: 1 }
      }) {
        for (let DIR of roseDirs) {
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            if (!ARTIFACTS.nokings[POS]) {
              ARTIFACTS.kingwalk[POS] = {};
            }
          }
        }
      }
    }
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS.adjacentenemies[POS] = { dir: DIR };
        }
      }
    }
    for (let STARTPOS in ARTIFACTS.adjacentenemies) {
      let DIR =
        relativeDirs[1][(ARTIFACTS.adjacentenemies[STARTPOS] || {}).dir];

      let NEIGHBOURCOUNT;
      let POS = connections[STARTPOS][DIR];
      if (
        POS &&
        !{
          ...UNITLAYERS.units,
          ...(UNITLAYERS.mykings[MARKS.selectunit]
            ? ARTIFACTS.nokings
            : ARTIFACTS.nosoldiers)
        }[POS]
      ) {
        NEIGHBOURCOUNT = 1;

        ARTIFACTS.jumptargets[POS] = { dir: DIR };
      }

      if (!!NEIGHBOURCOUNT) {
        ARTIFACTS.willdie[STARTPOS] = { dir: DIR };
      }
    }

    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget1",
      pos: Object.keys(
        UNITLAYERS.mykings[MARKS.selectunit]
          ? ARTIFACTS.kingwalk
          : Object.keys(BOARD.board)
              .filter(
                k =>
                  !{
                    ...UNITLAYERS.units,
                    ...ARTIFACTS.nosoldiers,
                    ...ARTIFACTS.jumptargets
                  }.hasOwnProperty(k)
              )
              .reduce((m, k) => ({ ...m, [k]: {} }), {})
      )
    };

    LINKS.marks.selectjumptarget = {
      func: "selectjumptarget1",
      pos: Object.keys(ARTIFACTS.jumptargets)
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectunit",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectunit1instruction = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return UNITLAYERS.kings[MARKS.selectunit]
      ? collapseContent({
          line: [
            { text: "Select where to" },
            collapseContent({
              line: [
                Object.keys(ARTIFACTS.kingwalk).length !== 0
                  ? { text: "move" }
                  : undefined,
                Object.keys(ARTIFACTS.jumptargets).length !== 0
                  ? { text: "jump" }
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
            }),
            { text: "your" },
            { unittype: "king" },
            Object.keys(
              Object.entries(
                Object.keys(ARTIFACTS.nokings)
                  .concat(
                    Object.keys({
                      ...ARTIFACTS.kingwalk,
                      ...ARTIFACTS.jumptargets
                    })
                  )
                  .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
              )
                .filter(([key, n]) => n === 2)
                .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
            ).length !== 0
              ? { text: "without making a forbidden configuration" }
              : undefined
          ]
        })
      : collapseContent({
          line: [
            { text: "Select where to move" },
            Object.keys(ARTIFACTS.jumptargets).length !== 0
              ? { text: "or jump" }
              : undefined,
            { text: "your" },
            { unittype: "pawn" },
            Object.keys(ARTIFACTS.nosoldiers).length !== 0
              ? { text: "without making a forbidden configuration" }
              : undefined
          ]
        });
  };
  game.selectmovetarget1 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.move = "move1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmovetarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectmovetarget1instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to go from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
  game.selectjumptarget1 = (step, newMarkPos) => {
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: step.ARTIFACTS.kingwalk,
      adjacentenemies: step.ARTIFACTS.adjacentenemies,
      splashed: { ...step.ARTIFACTS.splashed },
      willdie: step.ARTIFACTS.willdie,
      jumptargets: step.ARTIFACTS.jumptargets
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectjumptarget: newMarkPos };

    let filtersourcelayer = ARTIFACTS.willdie;
    let filtertargetlayer = ARTIFACTS.splashed;
    for (let POS in filtersourcelayer) {
      let filterObj = filtersourcelayer[POS];
      if (
        filterObj.dir ===
        (ARTIFACTS.jumptargets[MARKS.selectjumptarget] || {}).dir
      ) {
        filtertargetlayer[POS] = filterObj;
      }
    }

    LINKS.commands.jump = "jump1";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectjumptarget",
      ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectjumptarget1instruction = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "jump" },
        { text: "to jump from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectjumptarget },
        { text: "and kill the" },
        {
          unit: [
            { kings: "king", soldiers: "pawn" }[
              (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).group
            ],
            (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).owner,
            Object.keys(ARTIFACTS.splashed)[0]
          ]
        },
        { text: "at" },
        { pos: Object.keys(ARTIFACTS.splashed)[0] }
      ]
    });
  };
}
{
  const ownerNames = ["neutral", "opp", "my"];
  const TERRAIN = {
    homerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      f1: { pos: "f1", x: 6, y: 1, owner: 1 },
      g1: { pos: "g1", x: 7, y: 1, owner: 1 },
      h1: { pos: "h1", x: 8, y: 1, owner: 1 },
      a8: { pos: "a8", x: 1, y: 8, owner: 2 },
      b8: { pos: "b8", x: 2, y: 8, owner: 2 },
      c8: { pos: "c8", x: 3, y: 8, owner: 2 },
      d8: { pos: "d8", x: 4, y: 8, owner: 2 },
      e8: { pos: "e8", x: 5, y: 8, owner: 2 },
      f8: { pos: "f8", x: 6, y: 8, owner: 2 },
      g8: { pos: "g8", x: 7, y: 8, owner: 2 },
      h8: { pos: "h8", x: 8, y: 8, owner: 2 }
    },
    opphomerow: {
      a1: { pos: "a1", x: 1, y: 1, owner: 1 },
      b1: { pos: "b1", x: 2, y: 1, owner: 1 },
      c1: { pos: "c1", x: 3, y: 1, owner: 1 },
      d1: { pos: "d1", x: 4, y: 1, owner: 1 },
      e1: { pos: "e1", x: 5, y: 1, owner: 1 },
      f1: { pos: "f1", x: 6, y: 1, owner: 1 },
      g1: { pos: "g1", x: 7, y: 1, owner: 1 },
      h1: { pos: "h1", x: 8, y: 1, owner: 1 }
    },
    myhomerow: {
      a8: { pos: "a8", x: 1, y: 8, owner: 2 },
      b8: { pos: "b8", x: 2, y: 8, owner: 2 },
      c8: { pos: "c8", x: 3, y: 8, owner: 2 },
      d8: { pos: "d8", x: 4, y: 8, owner: 2 },
      e8: { pos: "e8", x: 5, y: 8, owner: 2 },
      f8: { pos: "f8", x: 6, y: 8, owner: 2 },
      g8: { pos: "g8", x: 7, y: 8, owner: 2 },
      h8: { pos: "h8", x: 8, y: 8, owner: 2 }
    },
    edges: {
      a1: { pos: "a1", x: 1, y: 1 },
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      a5: { pos: "a5", x: 1, y: 5 },
      a6: { pos: "a6", x: 1, y: 6 },
      a7: { pos: "a7", x: 1, y: 7 },
      a8: { pos: "a8", x: 1, y: 8 },
      h1: { pos: "h1", x: 8, y: 1 },
      h2: { pos: "h2", x: 8, y: 2 },
      h3: { pos: "h3", x: 8, y: 3 },
      h4: { pos: "h4", x: 8, y: 4 },
      h5: { pos: "h5", x: 8, y: 5 },
      h6: { pos: "h6", x: 8, y: 6 },
      h7: { pos: "h7", x: 8, y: 7 },
      h8: { pos: "h8", x: 8, y: 8 },
      b8: { pos: "b8", x: 2, y: 8 },
      c8: { pos: "c8", x: 3, y: 8 },
      d8: { pos: "d8", x: 4, y: 8 },
      e8: { pos: "e8", x: 5, y: 8 },
      f8: { pos: "f8", x: 6, y: 8 },
      g8: { pos: "g8", x: 7, y: 8 },
      b1: { pos: "b1", x: 2, y: 1 },
      c1: { pos: "c1", x: 3, y: 1 },
      d1: { pos: "d1", x: 4, y: 1 },
      e1: { pos: "e1", x: 5, y: 1 },
      f1: { pos: "f1", x: 6, y: 1 },
      g1: { pos: "g1", x: 7, y: 1 }
    },
    nohomerow: {
      a2: { pos: "a2", x: 1, y: 2 },
      a3: { pos: "a3", x: 1, y: 3 },
      a4: { pos: "a4", x: 1, y: 4 },
      a5: { pos: "a5", x: 1, y: 5 },
      a6: { pos: "a6", x: 1, y: 6 },
      a7: { pos: "a7", x: 1, y: 7 },
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      b5: { pos: "b5", x: 2, y: 5 },
      b6: { pos: "b6", x: 2, y: 6 },
      b7: { pos: "b7", x: 2, y: 7 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      c5: { pos: "c5", x: 3, y: 5 },
      c6: { pos: "c6", x: 3, y: 6 },
      c7: { pos: "c7", x: 3, y: 7 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      d5: { pos: "d5", x: 4, y: 5 },
      d6: { pos: "d6", x: 4, y: 6 },
      d7: { pos: "d7", x: 4, y: 7 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 },
      e5: { pos: "e5", x: 5, y: 5 },
      e6: { pos: "e6", x: 5, y: 6 },
      e7: { pos: "e7", x: 5, y: 7 },
      f2: { pos: "f2", x: 6, y: 2 },
      f3: { pos: "f3", x: 6, y: 3 },
      f4: { pos: "f4", x: 6, y: 4 },
      f5: { pos: "f5", x: 6, y: 5 },
      f6: { pos: "f6", x: 6, y: 6 },
      f7: { pos: "f7", x: 6, y: 7 },
      g2: { pos: "g2", x: 7, y: 2 },
      g3: { pos: "g3", x: 7, y: 3 },
      g4: { pos: "g4", x: 7, y: 4 },
      g5: { pos: "g5", x: 7, y: 5 },
      g6: { pos: "g6", x: 7, y: 6 },
      g7: { pos: "g7", x: 7, y: 7 },
      h2: { pos: "h2", x: 8, y: 2 },
      h3: { pos: "h3", x: 8, y: 3 },
      h4: { pos: "h4", x: 8, y: 4 },
      h5: { pos: "h5", x: 8, y: 5 },
      h6: { pos: "h6", x: 8, y: 6 },
      h7: { pos: "h7", x: 8, y: 7 }
    },
    noedges: {
      b2: { pos: "b2", x: 2, y: 2 },
      b3: { pos: "b3", x: 2, y: 3 },
      b4: { pos: "b4", x: 2, y: 4 },
      b5: { pos: "b5", x: 2, y: 5 },
      b6: { pos: "b6", x: 2, y: 6 },
      b7: { pos: "b7", x: 2, y: 7 },
      c2: { pos: "c2", x: 3, y: 2 },
      c3: { pos: "c3", x: 3, y: 3 },
      c4: { pos: "c4", x: 3, y: 4 },
      c5: { pos: "c5", x: 3, y: 5 },
      c6: { pos: "c6", x: 3, y: 6 },
      c7: { pos: "c7", x: 3, y: 7 },
      d2: { pos: "d2", x: 4, y: 2 },
      d3: { pos: "d3", x: 4, y: 3 },
      d4: { pos: "d4", x: 4, y: 4 },
      d5: { pos: "d5", x: 4, y: 5 },
      d6: { pos: "d6", x: 4, y: 6 },
      d7: { pos: "d7", x: 4, y: 7 },
      e2: { pos: "e2", x: 5, y: 2 },
      e3: { pos: "e3", x: 5, y: 3 },
      e4: { pos: "e4", x: 5, y: 4 },
      e5: { pos: "e5", x: 5, y: 5 },
      e6: { pos: "e6", x: 5, y: 6 },
      e7: { pos: "e7", x: 5, y: 7 },
      f2: { pos: "f2", x: 6, y: 2 },
      f3: { pos: "f3", x: 6, y: 3 },
      f4: { pos: "f4", x: 6, y: 4 },
      f5: { pos: "f5", x: 6, y: 5 },
      f6: { pos: "f6", x: 6, y: 6 },
      f7: { pos: "f7", x: 6, y: 7 },
      g2: { pos: "g2", x: 7, y: 2 },
      g3: { pos: "g3", x: 7, y: 3 },
      g4: { pos: "g4", x: 7, y: 4 },
      g5: { pos: "g5", x: 7, y: 5 },
      g6: { pos: "g6", x: 7, y: 6 },
      g7: { pos: "g7", x: 7, y: 7 }
    }
  };
  game.start2 = step => {
    let ARTIFACTS = {
      nokings: {},
      nosoldiers: {},
      kingwalk: {},
      adjacentenemies: {},
      splashed: {},
      willdie: {},
      jumptargets: {}
    };
    const oldUnitLayers = step.UNITLAYERS;
    let UNITLAYERS = {
      units: oldUnitLayers.units,
      myunits: oldUnitLayers.oppunits,
      oppunits: oldUnitLayers.myunits,
      neutralunits: oldUnitLayers.neutralunits,
      kings: oldUnitLayers.kings,
      mykings: oldUnitLayers.oppkings,
      oppkings: oldUnitLayers.mykings,
      neutralkings: oldUnitLayers.neutralkings,
      soldiers: oldUnitLayers.soldiers,
      mysoldiers: oldUnitLayers.oppsoldiers,
      oppsoldiers: oldUnitLayers.mysoldiers,
      neutralsoldiers: oldUnitLayers.neutralsoldiers
    };
    let LINKS: Links = {
      commands: {},
      marks: {}
    };
    let TURN = step.TURN + 1;

    for (let STARTPOS in Object.entries(
      Object.keys(TERRAIN.edges)
        .concat(Object.keys(UNITLAYERS.mysoldiers))
        .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
    )
      .filter(([key, n]) => n === 2)
      .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})) {
      let startconnections = connections[STARTPOS];
      for (let DIR of TERRAIN.homerow[STARTPOS] ? orthoDirs : [1, 5]) {
        let POS = startconnections[DIR];
        if (POS) {
          ARTIFACTS.nokings[POS] = {};
        }
      }
    }

    for (let STARTPOS in UNITLAYERS.mykings) {
      let startconnections = connections[STARTPOS];
      for (let DIR of orthoDirs) {
        let POS = startconnections[DIR];
        if (
          POS &&
          (TERRAIN.homerow[POS] ||
            (TERRAIN.edges[STARTPOS] && TERRAIN.edges[POS]))
        ) {
          ARTIFACTS.nosoldiers[POS] = {};
        }
      }
    }
    if (TURN > 2) {
      LINKS.marks.selectunit = {
        func: "selectunit2",
        pos: Object.keys(UNITLAYERS.myunits)
      };
    } else {
      LINKS.marks.selectkingdeploy = {
        func: "selectkingdeploy2",
        pos: Object.keys(
          Object.keys(BOARD.board)
            .filter(
              k =>
                !{ ...UNITLAYERS.units, ...ARTIFACTS.nokings }.hasOwnProperty(k)
            )
            .reduce((m, k) => ({ ...m, [k]: {} }), {})
        )
      };
    }

    return {
      UNITDATA: step.UNITDATA,
      LINKS,
      name: "start",
      path: [],
      UNITLAYERS,
      ARTIFACTS,
      MARKS: {},
      TURN,
      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.start2instruction = step => {
    let TURN = step.TURN;

    return TURN > 2
      ? { text: "Select a unit to move" }
      : collapseContent({
          line: [{ text: "Select where to deploy your" }, { unittype: "king" }]
        });
  };
  game.newBattle = () => {
    let UNITDATA = {
      unit1: {
        pos: "a1",
        x: 1,
        y: 1,
        id: "unit1",
        group: "soldiers",
        owner: 1
      },
      unit2: {
        pos: "b1",
        x: 2,
        y: 1,
        id: "unit2",
        group: "soldiers",
        owner: 1
      },
      unit3: {
        pos: "c1",
        x: 3,
        y: 1,
        id: "unit3",
        group: "soldiers",
        owner: 1
      },
      unit4: {
        pos: "d1",
        x: 4,
        y: 1,
        id: "unit4",
        group: "soldiers",
        owner: 1
      },
      unit5: {
        pos: "e1",
        x: 5,
        y: 1,
        id: "unit5",
        group: "soldiers",
        owner: 1
      },
      unit6: {
        pos: "f1",
        x: 6,
        y: 1,
        id: "unit6",
        group: "soldiers",
        owner: 1
      },
      unit7: {
        pos: "g1",
        x: 7,
        y: 1,
        id: "unit7",
        group: "soldiers",
        owner: 1
      },
      unit8: {
        pos: "h1",
        x: 8,
        y: 1,
        id: "unit8",
        group: "soldiers",
        owner: 1
      },
      unit9: {
        pos: "a8",
        x: 1,
        y: 8,
        id: "unit9",
        group: "soldiers",
        owner: 2
      },
      unit10: {
        pos: "b8",
        x: 2,
        y: 8,
        id: "unit10",
        group: "soldiers",
        owner: 2
      },
      unit11: {
        pos: "c8",
        x: 3,
        y: 8,
        id: "unit11",
        group: "soldiers",
        owner: 2
      },
      unit12: {
        pos: "d8",
        x: 4,
        y: 8,
        id: "unit12",
        group: "soldiers",
        owner: 2
      },
      unit13: {
        pos: "e8",
        x: 5,
        y: 8,
        id: "unit13",
        group: "soldiers",
        owner: 2
      },
      unit14: {
        pos: "f8",
        x: 6,
        y: 8,
        id: "unit14",
        group: "soldiers",
        owner: 2
      },
      unit15: {
        pos: "g8",
        x: 7,
        y: 8,
        id: "unit15",
        group: "soldiers",
        owner: 2
      },
      unit16: {
        pos: "h8",
        x: 8,
        y: 8,
        id: "unit16",
        group: "soldiers",
        owner: 2
      }
    };

    let UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    return game.start1({
      NEXTSPAWNID: 1,

      TURN: 0,
      UNITDATA,
      UNITLAYERS
    });
  };
  game.deploy2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let NEXTSPAWNID = step.NEXTSPAWNID;
    let TURN = step.TURN;
    let MARKS = step.MARKS;
    {
      let newunitid = "spawn" + NEXTSPAWNID++;
      UNITDATA[newunitid] = {
        pos: MARKS.selectkingdeploy,
        id: newunitid,
        group: "kings",
        owner: 2
      };
    }
    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else if (TURN > 2 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      path: step.path.concat("deploy"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID
    };
  };
  game.move2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let TURN = step.TURN;
    let MARKS = step.MARKS;
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
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else if (TURN > 2 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      path: step.path.concat("move"),
      MARKS: {},
      ARTIFACTS: step.ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.jump2 = step => {
    let LINKS: Links = { commands: {}, marks: {} };
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: step.ARTIFACTS.kingwalk,
      adjacentenemies: step.ARTIFACTS.adjacentenemies,
      splashed: step.ARTIFACTS.splashed,
      willdie: step.ARTIFACTS.willdie,
      jumptargets: step.ARTIFACTS.jumptargets
    };
    let UNITLAYERS = step.UNITLAYERS;
    let UNITDATA = { ...step.UNITDATA };
    let TURN = step.TURN;
    let MARKS = step.MARKS;
    delete UNITDATA[
      (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).id
    ];
    {
      let unitid = (UNITLAYERS.units[MARKS.selectunit] || {}).id;
      if (unitid) {
        UNITDATA[unitid] = {
          ...UNITDATA[unitid],
          pos: MARKS.selectjumptarget
        };
      }
    }

    UNITLAYERS = {
      units: {},
      myunits: {},
      oppunits: {},
      neutralunits: {},
      kings: {},
      mykings: {},
      oppkings: {},
      neutralkings: {},
      soldiers: {},
      mysoldiers: {},
      oppsoldiers: {},
      neutralsoldiers: {}
    };
    for (let unitid in UNITDATA) {
      const currentunit = UNITDATA[unitid];
      const { group, pos, owner } = currentunit;
      const ownerPrefix = ownerNames[owner];
      UNITLAYERS.units[pos] = UNITLAYERS[group][pos] = UNITLAYERS[
        ownerPrefix + group
      ][pos] = UNITLAYERS[ownerPrefix + "units"][pos] = currentunit;
    }

    if (
      Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      ).length !== 0
    ) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "infiltration";
      LINKS.endMarks = Object.keys(
        Object.entries(
          Object.keys(UNITLAYERS.mykings)
            .concat(Object.keys(TERRAIN.opphomerow))
            .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
        )
          .filter(([key, n]) => n === 2)
          .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
      );
    } else if (TURN > 2 && Object.keys(UNITLAYERS.oppkings).length === 0) {
      let winner = 2;
      LINKS.endturn = winner === 2 ? "win" : winner ? "lose" : "draw";
      LINKS.endedBy = "kingkill";
    } else {
      LINKS.endturn = "start1";
    }
    return {
      LINKS,
      path: step.path.concat("jump"),
      MARKS: {},
      ARTIFACTS,
      TURN,
      UNITDATA,
      UNITLAYERS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectkingdeploy2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.deploy = "deploy2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectkingdeploy",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectkingdeploy: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectkingdeploy2instruction = step => {
    return collapseContent({
      line: [
        { text: "Press" },
        { command: "deploy" },
        { text: "to place your king here" }
      ]
    });
  };
  game.selectunit2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: { ...step.ARTIFACTS.kingwalk },
      adjacentenemies: { ...step.ARTIFACTS.adjacentenemies },
      splashed: step.ARTIFACTS.splashed,
      willdie: { ...step.ARTIFACTS.willdie },
      jumptargets: { ...step.ARTIFACTS.jumptargets }
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectunit: newMarkPos };
    let UNITLAYERS = step.UNITLAYERS;
    {
      let BLOCKS = UNITLAYERS.units;

      for (let STARTPOS in {
        ...UNITLAYERS.mykings,
        ...{ [MARKS.selectunit]: 1 }
      }) {
        for (let DIR of roseDirs) {
          let POS = STARTPOS;
          while ((POS = connections[POS][DIR]) && !BLOCKS[POS]) {
            if (!ARTIFACTS.nokings[POS]) {
              ARTIFACTS.kingwalk[POS] = {};
            }
          }
        }
      }
    }
    {
      let startconnections = connections[MARKS.selectunit];
      for (let DIR of roseDirs) {
        let POS = startconnections[DIR];
        if (POS && UNITLAYERS.oppunits[POS]) {
          ARTIFACTS.adjacentenemies[POS] = { dir: DIR };
        }
      }
    }
    for (let STARTPOS in ARTIFACTS.adjacentenemies) {
      let DIR =
        relativeDirs[1][(ARTIFACTS.adjacentenemies[STARTPOS] || {}).dir];

      let NEIGHBOURCOUNT;
      let POS = connections[STARTPOS][DIR];
      if (
        POS &&
        !{
          ...UNITLAYERS.units,
          ...(UNITLAYERS.mykings[MARKS.selectunit]
            ? ARTIFACTS.nokings
            : ARTIFACTS.nosoldiers)
        }[POS]
      ) {
        NEIGHBOURCOUNT = 1;

        ARTIFACTS.jumptargets[POS] = { dir: DIR };
      }

      if (!!NEIGHBOURCOUNT) {
        ARTIFACTS.willdie[STARTPOS] = { dir: DIR };
      }
    }

    LINKS.marks.selectmovetarget = {
      func: "selectmovetarget2",
      pos: Object.keys(
        UNITLAYERS.mykings[MARKS.selectunit]
          ? ARTIFACTS.kingwalk
          : Object.keys(BOARD.board)
              .filter(
                k =>
                  !{
                    ...UNITLAYERS.units,
                    ...ARTIFACTS.nosoldiers,
                    ...ARTIFACTS.jumptargets
                  }.hasOwnProperty(k)
              )
              .reduce((m, k) => ({ ...m, [k]: {} }), {})
      )
    };

    LINKS.marks.selectjumptarget = {
      func: "selectjumptarget2",
      pos: Object.keys(ARTIFACTS.jumptargets)
    };

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectunit",
      ARTIFACTS,
      UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectunit2instruction = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return UNITLAYERS.kings[MARKS.selectunit]
      ? collapseContent({
          line: [
            { text: "Select where to" },
            collapseContent({
              line: [
                Object.keys(ARTIFACTS.kingwalk).length !== 0
                  ? { text: "move" }
                  : undefined,
                Object.keys(ARTIFACTS.jumptargets).length !== 0
                  ? { text: "jump" }
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
            }),
            { text: "your" },
            { unittype: "king" },
            Object.keys(
              Object.entries(
                Object.keys(ARTIFACTS.nokings)
                  .concat(
                    Object.keys({
                      ...ARTIFACTS.kingwalk,
                      ...ARTIFACTS.jumptargets
                    })
                  )
                  .reduce((mem, k) => ({ ...mem, [k]: (mem[k] || 0) + 1 }), {})
              )
                .filter(([key, n]) => n === 2)
                .reduce((mem, [key]) => ({ ...mem, [key]: {} }), {})
            ).length !== 0
              ? { text: "without making a forbidden configuration" }
              : undefined
          ]
        })
      : collapseContent({
          line: [
            { text: "Select where to move" },
            Object.keys(ARTIFACTS.jumptargets).length !== 0
              ? { text: "or jump" }
              : undefined,
            { text: "your" },
            { unittype: "pawn" },
            Object.keys(ARTIFACTS.nosoldiers).length !== 0
              ? { text: "without making a forbidden configuration" }
              : undefined
          ]
        });
  };
  game.selectmovetarget2 = (step, newMarkPos) => {
    let LINKS: Links = { commands: {}, marks: {} };

    LINKS.commands.move = "move2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectmovetarget",
      ARTIFACTS: step.ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS: { ...step.MARKS, selectmovetarget: newMarkPos },

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectmovetarget2instruction = step => {
    let MARKS = step.MARKS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "move" },
        { text: "to go from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectmovetarget }
      ]
    });
  };
  game.selectjumptarget2 = (step, newMarkPos) => {
    let ARTIFACTS = {
      nokings: step.ARTIFACTS.nokings,
      nosoldiers: step.ARTIFACTS.nosoldiers,
      kingwalk: step.ARTIFACTS.kingwalk,
      adjacentenemies: step.ARTIFACTS.adjacentenemies,
      splashed: { ...step.ARTIFACTS.splashed },
      willdie: step.ARTIFACTS.willdie,
      jumptargets: step.ARTIFACTS.jumptargets
    };
    let LINKS: Links = { commands: {}, marks: {} };
    let MARKS = { ...step.MARKS, selectjumptarget: newMarkPos };

    let filtersourcelayer = ARTIFACTS.willdie;
    let filtertargetlayer = ARTIFACTS.splashed;
    for (let POS in filtersourcelayer) {
      let filterObj = filtersourcelayer[POS];
      if (
        filterObj.dir ===
        (ARTIFACTS.jumptargets[MARKS.selectjumptarget] || {}).dir
      ) {
        filtertargetlayer[POS] = filterObj;
      }
    }

    LINKS.commands.jump = "jump2";

    return {
      LINKS,
      path: step.path.concat(newMarkPos),
      name: "selectjumptarget",
      ARTIFACTS,
      UNITLAYERS: step.UNITLAYERS,
      UNITDATA: step.UNITDATA,
      TURN: step.TURN,
      MARKS,

      NEXTSPAWNID: step.NEXTSPAWNID
    };
  };
  game.selectjumptarget2instruction = step => {
    let ARTIFACTS = step.ARTIFACTS;
    let MARKS = step.MARKS;

    let UNITLAYERS = step.UNITLAYERS;

    return collapseContent({
      line: [
        { text: "Press" },
        { command: "jump" },
        { text: "to jump from" },
        { pos: MARKS.selectunit },
        { text: "to" },
        { pos: MARKS.selectjumptarget },
        { text: "and kill the" },
        {
          unit: [
            { kings: "king", soldiers: "pawn" }[
              (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).group
            ],
            (UNITLAYERS.units[Object.keys(ARTIFACTS.splashed)[0]] || {}).owner,
            Object.keys(ARTIFACTS.splashed)[0]
          ]
        },
        { text: "at" },
        { pos: Object.keys(ARTIFACTS.splashed)[0] }
      ]
    });
  };
}
export default game;
