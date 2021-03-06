import * as fs from "fs-extra";
import * as path from "path";
import * as prettier from "prettier";

const defs = path.join(__dirname, "../definitions");
const out = path.join(__dirname, "../dist");

fs.removeSync(out);
fs.ensureDirSync(out);
fs.ensureDirSync(path.join(out, "games"));
fs.ensureDirSync(path.join(out, "meta"));

const gameIds = fs.readdirSync(defs).filter(gid => gid !== ".DS_Store");

const listFile = prettier.format(
  `// Generated by npm run export
export const list: GameId[] = [${gameIds.map(gid => `"${gid}"`).join(", ")}];
export type GameId = ${gameIds.map(gid => `"${gid}"`).join(" | ")};
export default list;
`,
  { filepath: "foo.ts" }
);

fs.writeFileSync(path.join(out, "list.ts"), listFile);

const gameListFile = prettier.format(
  `// Generated by npm run export\nmodule.exports = [${gameIds
    .map(gid => `"${gid}"`)
    .join(", ")}];`,
  { filepath: "foo.js" }
);
fs.writeFileSync(path.join(out, "gameList.js"), gameListFile);

const gpath = path.join(out, "games");
fs.ensureDirSync(gpath);
gameIds.forEach(gid => {
  fs.writeFileSync(
    path.join(gpath, gid + ".ts"),
    `// File generated by 'npm run export'
import ${gid} from '../../definitions/${gid}/index';

export default ${gid};
export * from '../../definitions/${gid}/index';
`
  );
});

const mpath = path.join(out, "meta");
fs.ensureDirSync(mpath);
gameIds.forEach(gid => {
  fs.writeFileSync(
    path.join(mpath, gid + ".ts"),
    `// File generated by 'npm run export'
import _${gid}Meta from '../../definitions/${gid}/meta';
export const ${gid}Meta = _${gid}Meta;

export default ${gid}Meta;
`
  );
});

fs.writeFileSync(
  path.join(out, "lib.ts"),
  `// Generated by npm run export\nimport { FullDefAnon } from '../../types';
${gameIds
  .map(gid => `import ${gid} from '../definitions/${gid}/index';`)
  .join("\n")}

const lib = {
${gameIds.map(gid => `  ${gid},\n`).join("")}};

export default lib as typeof lib & { [name: string]: FullDefAnon };
`
);

fs.writeFileSync(
  path.join(out, "meta.ts"),
  `// Generated by npm run export\n${gameIds
    .map(gid => `import ${gid}Meta from '../definitions/${gid}/meta';`)
    .join("\n")}

const meta = {
${gameIds.map(gid => `  ${gid}: ${gid}Meta,\n`).join("")}};

export default meta;
`
);

const metaPromises = gameIds.map(id =>
  import(path.join(defs, id, "meta.ts")).then(obj => obj.default)
);
Promise.all(metaPromises).then(metaArr => {
  const id2code = metaArr.reduce(
    (memo, meta) => ({ ...memo, [meta.id]: meta.code }),
    {}
  );
  const id2codeFile = prettier.format(
    `// Generated by exports command\nmodule.exports = ${JSON.stringify(
      id2code
    )}`,
    { filepath: "foo.js" }
  );
  fs.writeFileSync(path.join(out, "id2code.js"), id2codeFile);

  const id2name = metaArr.reduce(
    (memo, meta) => ({ ...memo, [meta.id]: meta.name }),
    {}
  );
  const id2nameFile = prettier.format(
    `// Generated by exports command\nmodule.exports = ${JSON.stringify(
      id2name
    )}`,
    { filepath: "foo.js" }
  );
  fs.writeFileSync(path.join(out, "id2name.js"), id2nameFile);
});
