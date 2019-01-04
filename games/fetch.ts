const fs = require("fs-extra");
const beautify = require("js-beautify");
import analyze from "./analyze";
import stub from "./stub";

import { typeSignature } from "./types";

function makeNice(obj = {}) {
  return beautify(JSON.stringify(obj).replace(/"([a-zA-Z]+)":/g, "$1:"), {
    indent_size: 2
  });
}

fs.removeSync("./definitions");

fs.readdirSync("../library/defs")
  .filter(f => f !== ".DS_Store")
  .forEach(fname => {
    const gameId = fname.split(".")[0];
    const capId = gameId[0].toUpperCase().concat(gameId.slice(1));
    stub(gameId);
    const json = JSON.parse(
      fs.readFileSync("../library/defs/" + fname).toString()
    );
    const {
      meta: { instructions = {}, ...otherMeta } = {},
      AI,
      graphics,
      board,
      setup,
      ...rules
    } = json;
    graphics.icons = graphics.icons || {};
    graphics.tiles = graphics.tiles || {};
    board.terrain = board.terrain || {};

    let scripts;
    try {
      scripts = fs
        .readFileSync("../gamescripts/pergame/" + gameId + ".ts")
        .toString()
        .replace("../types", "../../types");
    } catch (e) {
      scripts = `import { GameTestSuite } from '../../types';

const ${gameId}Tests: GameTestSuite = {};

export default ${gameId}Tests;
`;
    }
    fs.ensureDirSync("./definitions/" + gameId);

    // -------------- META --------------
    fs.writeFileSync(
      "./definitions/" + gameId + "/meta.ts",
      `import {Meta} from '../../types';

const ${gameId}Meta: Meta = ${makeNice(otherMeta || {})};

export default ${gameId}Meta;
`
    );

    // -------------- RULES --------------
    const rsig = typeSignature("Definition", gameId);
    fs.writeFileSync(
      "./definitions/" + gameId + "/rules.ts",
      `import {Definition} from '../../types';
import { ${rsig} } from './_types';

const ${gameId}Rules: Definition<${rsig}> = ${makeNice(rules)};

export default ${gameId}Rules;
`
    );

    // -------------- AI --------------
    fs.writeFileSync(
      "./definitions/" + gameId + "/ai.ts",
      `import {AI} from '../../types';

const ${gameId}AI: AI = ${makeNice(AI)};

export default ${gameId}AI;
`
    );

    // -------------- INSTRUCTIONS --------------
    const isig = typeSignature("Instructions", gameId);
    fs.writeFileSync(
      "./definitions/" + gameId + "/instructions.ts",
      `import {Instructions} from '../../types';
import { ${isig} } from './_types';

const ${gameId}Instructions: Instructions<${isig}> = ${makeNice(
        instructions || {}
      )};

export default ${gameId}Instructions;
`
    );

    // -------------- GRAPHICS --------------
    const gsig = typeSignature("Graphics", gameId);
    fs.writeFileSync(
      "./definitions/" + gameId + "/graphics.ts",
      `import {Graphics} from '../../types';
import { ${gsig} } from './_types';

const ${gameId}Graphics: Graphics<${gsig}> = ${makeNice(graphics || {})};

export default ${gameId}Graphics;
`
    );

    // -------------- BOARD --------------
    const bsig = typeSignature("Board", gameId);
    fs.writeFileSync(
      "./definitions/" + gameId + "/board.ts",
      `import {Board} from '../../types';
import { ${bsig} } from './_types';

const ${gameId}Board: Board<${bsig}> = ${makeNice(board || {})};

export default ${gameId}Board;
`
    );

    // -------------- SETUP --------------
    const ssig = typeSignature("Setup", gameId);
    fs.writeFileSync(
      "./definitions/" + gameId + "/setup.ts",
      `import {Setup} from '../../types';
import { ${ssig} } from './_types';

const ${gameId}Setup: Setup<${ssig}> = ${makeNice(setup || {})};

export default ${gameId}Setup;
`
    );

    fs.writeFileSync("./definitions/" + gameId + "/scripts.ts", scripts);

    analyze(gameId);
  });
