/*
Return a sorted array with all commands available in the UI at this time
*/
import {UI} from '../types';

export default function optionsInUI(UI:UI): string[] {
  return UI.commands.concat(UI.potentialMarks.map(m => m.pos)).concat(UI.system.filter(c => c.substr(0,4) !== 'undo')).sort();
}