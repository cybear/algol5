// Here you define the generators (artifact creators) for your game.
// The type analyser will look at this file to see what generators are available,
// and also what artifact layers there are. When you add/remove a generator or
// change the names of the layers you draw to, rerun the type analyser!

import { UglyduckDefinition } from "./_types";

const uglyduckGenerators: UglyduckDefinition["generators"] = {
  findmovetargets: {
    type: "neighbour",
    start: "selectunit",
    dirs: {
      ifelse: [
        { anyat: ["mykings", "selectunit"] },
        {
          playercase: [
            [4, 5, 6],
            [8, 1, 2]
          ]
        },
        {
          playercase: [
            [8, 1, 2],
            [4, 5, 6]
          ]
        }
      ]
    },
    condition: {
      ifelse: [
        { or: [{ same: [["dir"], 1] }, { same: [["dir"], 5] }] },
        { noneat: ["units", ["target"]] },
        { noneat: ["myunits", ["target"]] }
      ]
    },
    draw: { neighbours: { tolayer: "movetargets" } }
  }
};

export default uglyduckGenerators;
