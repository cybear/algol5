import { CommonLayer, Generators, Flow, Board, AI, Graphics, Instructions, Meta, Setup, GameTestSuite } from '../../../types';

export type JostleTerrain = never;
export type JostleUnit = "checkers";
export type JostleMark = "selectunit" | "selectmovetarget";
export type JostleCommand = "jostle";
export type JostlePhaseCommand = never;
export type JostlePhase = "startTurn" | JostleMark;
export type JostleUnitLayer = "checkers" | "mycheckers" | "neutralcheckers" | "oppcheckers";
export type JostleGenerator = "findinitial" | "findnew";
export type JostleArtifactLayer = "movetargets" | "initialenemy" | "initialfriend" | "newenemy" | "newfriend";
export type JostleTerrainLayer = never;
export type JostleLayer = CommonLayer | JostleUnitLayer | JostleArtifactLayer;
export type JostleBattlePos = any;
export type JostleBattleVar = any;
export type JostleTurnPos = any;
export type JostleTurnVar = any;
 
export type JostleGenerators = Generators<JostleArtifactLayer, JostleGenerator, JostleLayer>;
export type JostleFlow = Flow<JostleArtifactLayer, JostleCommand, JostleGenerator, JostleLayer, JostleMark, JostleUnit>;
export type JostleBoard = Board<JostleTerrain>;
export type JostleAI = AI;
export type JostleGraphics = Graphics<JostleTerrain, JostleUnit>;
export type JostleInstructions = Instructions<JostlePhase>;
export type JostleMeta = Meta;
export type JostleScripts = GameTestSuite;
export type JostleSetup = Setup<JostleUnit>;
