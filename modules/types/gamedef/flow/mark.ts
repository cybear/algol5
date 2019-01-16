import { AlgolVal, AlgolSet } from "../../";

export type MarkDef<Btlp, Btlv, Cmnd, Gen, Layer, Mrk, Turnp, Turnv> = {
  nodeadends?: boolean;
  from: AlgolSet<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  link?: AlgolVal<
    Cmnd | Mrk | "endturn",
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >;
  links?: AlgolVal<
    Cmnd | Mrk | "endturn",
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  >[];
  runGenerator?: AlgolVal<Gen, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
  runGenerators?: AlgolVal<Gen, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>[];
};