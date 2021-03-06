import { SerauqsFlow } from './_types';

const serauqsFlow: SerauqsFlow = {
  endGame: {
    madeline: {
      condition: ["notempty", "winline"],
      show: "winline"
    },
    madex: {
      condition: ["morethan", ["sizeof", ["intersect", "corners", ["union", "myunits", "oppwild"]]], 3],
      show: "corners"
    },
    tookcenter: {
      condition: ["morethan", ["sizeof", ["intersect", "middle", ["union", "myunits", "oppwild"]]], 3],
      show: "middle"
    }
  },
  startTurn: {
    link: "selectunit"
  },
  marks: {
    selectunit: {
      from: "myunits",
      runGenerator: "findmovetargets",
      link: ["ifelse", ["morethan", 3, ["turn"]], "promote", "selectmovetarget"]
    },
    selectmovetarget: {
      from: "movetargets",
      link: "move"
    }
  },
  commands: {
    promote: {
      applyEffect: ["setat", "selectunit", "group", "wild"],
      link: "endturn"
    },
    move: {
      applyEffect: ["moveat", "selectunit", "selectmovetarget"],
      runGenerator: "findwinline",
      link: "endturn"
    }
  }
};

export default serauqsFlow;
