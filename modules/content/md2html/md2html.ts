import prettier from "prettier";
import { AlgolArrangements, AlgolGameBlobAnon } from "../../types";
import { GameId } from "../../games/dist/list";
import fm from "front-matter";
import { insertTokens } from "./md2html.insertTokens";
import { processMarkdown } from "./md2html.processMarkdown";

type Md2htmlOpts = {
  md: string;
  arrs?: AlgolArrangements<AlgolGameBlobAnon>;
  gameId?: GameId;
  picSourcePath: string;
  picRefPath: string;
};

export const md2html = (opts: Md2htmlOpts) => {
  const { md: orig, arrs = {}, gameId, picSourcePath, picRefPath } = opts;
  const { body: md, attributes: yaml } = fm<any>(orig);
  const { markdown, preloads } = insertTokens({
    md,
    yaml,
    arrs,
    gameId,
    picSourcePath,
    picRefPath,
  });
  const ret = processMarkdown({ md: markdown });
  const html = `<div>${ret}</div>`;
  const nice = prettier
    .format(html, { filepath: "foo.html" })
    .replace(/\n$/, "");
  const date =
    yaml.updated instanceof Date
      ? yaml.updated.toISOString().slice(0, 10)
      : yaml.updated;
  return { html: nice, preloads: preloads, updated: date };
};
