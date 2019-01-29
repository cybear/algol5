import { FullDefAnon } from "../../types";

export const emptyFullDef: FullDefAnon = {
  generators: {},
  AI: {
    aspects: {},
    brains: {},
    generators: {},
    grids: {},
    terrain: {}
  },
  board: {
    height: 5,
    width: 5,
    terrain: {}
  },
  instructions: {},
  flow: {
    commands: {},
    marks: {}
  },
  graphics: {
    icons: {},
    tiles: {}
  },
  meta: {},
  scripts: {},
  setup: {}
};