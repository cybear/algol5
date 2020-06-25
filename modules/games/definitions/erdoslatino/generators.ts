// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { ErdoslatinoDefinition } from "./_types";

const erdoslatinoGenerators: ErdoslatinoDefinition["generators"] = {
  findchosencolumn: {
    type: "walker",
    dirs: [1, 5],
    start: "selecttarget",
    startasstep: true,
    draw: {
      steps: {
        tolayer: "currentcolumn",
      },
    },
  },
  findmiddle2: {
    type: "filter",
    layer: "currentcolumn",
    condition: {
      and: [
        { noneat: ["units", ["target"]] },
        { anyat: ["above1", ["target"]] },
        {
          or: [
            { anyat: ["below3", ["target"]] },
            { anyat: ["below4", ["target"]] },
            { anyat: ["below5", ["target"]] },
          ],
        },
      ],
    },
    tolayer: "conquerwith2",
  },
  findoppmiddle2: {
    type: "filter",
    layer: "currentcolumn",
    condition: {
      and: [
        { noneat: ["units", ["target"]] },
        { anyat: ["below1", ["target"]] },
        {
          or: [
            { anyat: ["above3", ["target"]] },
            { anyat: ["above4", ["target"]] },
            { anyat: ["above5", ["target"]] },
          ],
        },
      ],
    },
    tolayer: "oppconquerwith2",
  },
  findmiddle3: {
    type: "filter",
    layer: "currentcolumn",
    condition: {
      and: [
        { noneat: ["units", ["target"]] },
        {
          or: [
            { anyat: ["above1", ["target"]] },
            { anyat: ["above2", ["target"]] },
          ],
        },
        {
          or: [
            { anyat: ["below4", ["target"]] },
            { anyat: ["below5", ["target"]] },
          ],
        },
      ],
    },
    tolayer: "conquerwith3",
  },
  findoppmiddle3: {
    type: "filter",
    layer: "currentcolumn",
    condition: {
      and: [
        { noneat: ["units", ["target"]] },
        {
          or: [
            { anyat: ["below1", ["target"]] },
            { anyat: ["below2", ["target"]] },
          ],
        },
        {
          or: [
            { anyat: ["above4", ["target"]] },
            { anyat: ["above5", ["target"]] },
          ],
        },
      ],
    },
    tolayer: "oppconquerwith3",
  },
  findmiddle4: {
    type: "filter",
    layer: "currentcolumn",
    condition: {
      and: [
        { noneat: ["units", ["target"]] },
        {
          or: [
            { anyat: ["above1", ["target"]] },
            { anyat: ["above2", ["target"]] },
            { anyat: ["above3", ["target"]] },
          ],
        },
        { anyat: ["below5", ["target"]] },
      ],
    },
    tolayer: "conquerwith4",
  },
  findoppmiddle4: {
    type: "filter",
    layer: "currentcolumn",
    condition: {
      and: [
        { noneat: ["units", ["target"]] },
        {
          or: [
            { anyat: ["below1", ["target"]] },
            { anyat: ["below2", ["target"]] },
            { anyat: ["below3", ["target"]] },
          ],
        },
        { anyat: ["above5", ["target"]] },
      ],
    },
    tolayer: "oppconquerwith4",
  },
  finddownwardends: {
    type: "walker",
    starts: { intersect: ["downwards", "currentcolumn"] },
    dir: { playercase: [5, 1] },
    draw: {
      steps: [
        {
          unlessover: "units",
          condition: { morethan: [{ read: ["units", ["start"], "lvl"] }, 3] },
          tolayer: "conquerwith3",
        },
        {
          unlessover: "units",
          condition: { morethan: [{ read: ["units", ["start"], "lvl"] }, 2] },
          tolayer: "conquerwith2",
        },
        {
          unlessover: "units",
          tolayer: "conquerwith1",
        },
      ],
    },
  },
  findoppdownwardends: {
    type: "walker",
    starts: { intersect: ["oppdownwards", "currentcolumn"] },
    dir: { playercase: [1, 5] },
    draw: {
      steps: [
        {
          unlessover: "units",
          condition: { morethan: [{ read: ["units", ["start"], "lvl"] }, 3] },
          tolayer: "oppconquerwith3",
        },
        {
          unlessover: "units",
          condition: { morethan: [{ read: ["units", ["start"], "lvl"] }, 2] },
          tolayer: "oppconquerwith2",
        },
        {
          unlessover: "units",
          tolayer: "oppconquerwith1",
        },
      ],
    },
  },
  findupwardends: {
    type: "walker",
    starts: { intersect: ["upwards", "currentcolumn"] },
    dir: { playercase: [1, 5] },
    draw: {
      steps: [
        {
          unlessover: "units",
          condition: { lessthan: [{ read: ["units", ["start"], "lvl"] }, 3] },
          tolayer: "conquerwith3",
        },
        {
          unlessover: "units",
          condition: { lessthan: [{ read: ["units", ["start"], "lvl"] }, 4] },
          tolayer: "conquerwith4",
        },
        {
          unlessover: "units",
          tolayer: "conquerwith5",
        },
      ],
    },
  },
  findoppupwardends: {
    type: "walker",
    starts: { intersect: ["oppupwards", "currentcolumn"] },
    dir: { playercase: [5, 1] },
    draw: {
      steps: [
        {
          unlessover: "units",
          condition: { lessthan: [{ read: ["units", ["start"], "lvl"] }, 3] },
          tolayer: "oppconquerwith3",
        },
        {
          unlessover: "units",
          condition: { lessthan: [{ read: ["units", ["start"], "lvl"] }, 4] },
          tolayer: "oppconquerwith4",
        },
        {
          unlessover: "units",
          tolayer: "oppconquerwith5",
        },
      ],
    },
  },
  findvisibilities: {
    type: "walker",
    starts: "units",
    dirs: "ortho",
    draw: {
      last: {
        condition: {
          and: [
            { same: [["dir"], 1] },
            { noneat: ["neutralunits", ["start"]] },
          ],
        },
        unlessover: "ownedcolumns",
        tolayer: "ownedcolumns",
        include: {
          owner: { read: ["units", ["start"], "owner"] },
        },
      },
      steps: [
        {
          tolayer: {
            indexlist: [
              { read: ["units", ["start"], "lvl"] },
              "FOOBAR",
              "sees1",
              "sees2",
              "sees3",
              "sees4",
              "sees5",
            ],
          },
        },
        {
          condition: { same: [["dir"], { playercase: [1, 5] }] },
          tolayer: {
            indexlist: [
              { read: ["units", ["start"], "lvl"] },
              "FOOBAR",
              "above1",
              "above2",
              "above3",
              "above4",
              "above5",
            ],
          },
        },
        {
          condition: { same: [["dir"], { playercase: [5, 1] }] },
          tolayer: {
            indexlist: [
              { read: ["units", ["start"], "lvl"] },
              "FOOBAR",
              "below1",
              "below2",
              "below3",
              "below4",
              "below5",
            ],
          },
        },
        {
          condition: {
            and: [
              { noneat: ["neutralunits", ["start"]] },
              { or: [{ same: [["dir"], 1] }, { same: [["dir"], 5] }] },
            ],
          },
          tolayer: "takencolumn",
          include: {
            owner: {
              ifelse: [
                { anyat: ["myunits", ["start"]] },
                ["player"],
                ["otherplayer"],
              ],
            },
          },
        },
        {
          condition: {
            and: [
              { same: [["dir"], { playercase: [1, 5] }] },
              { anyat: ["units", ["target"]] },
              {
                morethan: [
                  { read: ["units", ["target"], "lvl"] },
                  { read: ["units", ["start"], "lvl"] },
                ],
              },
            ],
          },
          tolayer: "upwards",
          include: {
            lvl: { read: ["units", ["target"], "lvl"] },
          },
        },
        {
          condition: {
            and: [
              { same: [["dir"], { playercase: [5, 1] }] },
              { anyat: ["units", ["target"]] },
              {
                morethan: [
                  { read: ["units", ["target"], "lvl"] },
                  { read: ["units", ["start"], "lvl"] },
                ],
              },
            ],
          },
          tolayer: "oppupwards",
          include: {
            lvl: { read: ["units", ["target"], "lvl"] },
          },
        },
        {
          condition: {
            and: [
              { same: [["dir"], { playercase: [5, 1] }] },
              { anyat: ["units", ["target"]] },
              {
                lessthan: [
                  { read: ["units", ["target"], "lvl"] },
                  { read: ["units", ["start"], "lvl"] },
                ],
              },
            ],
          },
          tolayer: "downwards",
          include: {
            lvl: { read: ["units", ["target"], "lvl"] },
          },
        },
        {
          condition: {
            and: [
              { same: [["dir"], { playercase: [1, 5] }] },
              { anyat: ["units", ["target"]] },
              {
                lessthan: [
                  { read: ["units", ["target"], "lvl"] },
                  { read: ["units", ["start"], "lvl"] },
                ],
              },
            ],
          },
          tolayer: "oppdownwards",
          include: {
            lvl: { read: ["units", ["target"], "lvl"] },
          },
        },
      ],
    },
  },
};

export default erdoslatinoGenerators;