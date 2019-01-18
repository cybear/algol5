import { IfElse, IfActionElse, PlayerCase, IfPlayer, If } from "./_logical";
import { PosPos, SetSet, SetPos, ValVal, NumNum } from "./_signatures";
import { AlgolSet } from "./set";
import { AlgolVal } from "./value";
import { AlgolPos } from "./pos";
import { AlgolNumber } from "./number";

export type AlgolInstr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit> =
  | string
  | Cmnd
  | Unit
  | InstrVal<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | InstrPluralize<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | InstrNameAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>
  | InstrLine<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrOrList<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrIfPlayer<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrIf<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  | InstrPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>;

interface InstrPluralize<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit> {
  pluralize: [
    AlgolNumber<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>,
    AlgolInstr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>,
    AlgolInstr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  ];
}

interface InstrVal<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  value: AlgolVal<string | number, Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface InstrNameAt<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  nameat: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface InstrPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv> {
  pos: AlgolPos<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv>;
}

interface InstrOrList<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit> {
  orlist: AlgolInstr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>[];
}

interface InstrLine<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit> {
  line: AlgolInstr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>[];
}

interface InstrIfPlayer<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  extends IfPlayer<
    AlgolInstr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface InstrIf<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  extends If<
    AlgolInstr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface InstrIfElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  extends IfElse<
    AlgolInstr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface InstrIfActionElse<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  extends IfActionElse<
    AlgolInstr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}

interface InstrPlayerCase<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>
  extends PlayerCase<
    AlgolInstr<Btlp, Btlv, Cmnd, Layer, Mrk, Turnp, Turnv, Unit>,
    Btlp,
    Btlv,
    Cmnd,
    Layer,
    Mrk,
    Turnp,
    Turnv
  > {}