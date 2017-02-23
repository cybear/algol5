/*
Build script that will loop over all game definitions in the `defs` folder,
and create individual game generator files inside the `built` folder.

The code in a built file evaluates to an object with methods to make
moves in that particular game.

After this is done, these files can then be merged together by the script
in `collect.js`.
*/


import lib from '../src/codegen/'

import preProcess from './preprocess'

import fs from 'fs'

import {js_beautify} from 'js-beautify'

fs.readdirSync(__dirname+"/defs").forEach(gamename=>{
  let rules = preProcess.preProcess(require('./defs/'+gamename))
  console.log("building",gamename)
  let code = lib.makeGameObject({rules});
  code = `(${code})()`
  code = js_beautify(code,{indent_size:2}).replace(/\n{1,}/g,'\n');
  fs.writeFileSync(__dirname+'/built/'+gamename.replace('.json','.js'),code);
})