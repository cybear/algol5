import path from "path";
import fs from "fs-extra";
import resizeImg from "resize-img";
import lib from "../../../games/dist/lib";
import { render } from "../../render";
import { arrangement2sprites } from "../../../common";
import svg2png from "../../svg2png";
import img2data from "../../img2data";

export const renderGameActionShots = async (gameId: string) => {
  const target = path.join(__dirname, `../../dist/actionShots/${gameId}`);
  fs.ensureDirSync(target);
  const def = lib[gameId];
  for (const variant of def.variants) {
    if (variant.arr) {
      for (const active of [true, false]) {
        const board = def.boards[variant.board];
        const arr = active
          ? variant.arr
          : {
              ...variant.arr,
              marks: [],
              potentialMarks: [],
            };
        const sprites = arrangement2sprites({
          arrangement: arr,
          iconMap: def.graphics.icons,
        });
        const svgPic = render({
          board,
          tileMap: def.graphics.tiles,
          sprites,
          pad: true,
          definitionStrategy: "inline",
        });
        const fileName = `${gameId}_${variant.code}${active ? "_active" : ""}`;
        const noCodeFilename = `${gameId}${active ? "_active" : ""}`;
        // Write SVG pic
        const svgPath = path.join(target, `${fileName}.svg`);
        await fs.writeFile(svgPath, svgPic);
        // Write PNG pic
        const pngBuffer = await svg2png(svgPath);
        const pngPath = path.join(target, `${fileName}.png`);
        const out = fs.createWriteStream(pngPath);
        await new Promise(resolve => {
          out.on("finish", resolve);
          pngBuffer.pipe(out);
        });
        // Write small PNG pic
        const smallPath = path.join(target, `${fileName}_small.png`);
        const smallPng = await resizeImg(fs.readFileSync(pngPath), {
          width: 80,
          height: (80 * def.boards["basic"].height) / def.boards["basic"].width,
          format: "png",
        });
        fs.writeFileSync(smallPath, smallPng);
        // Write TS pic
        const dataURI = img2data(smallPath); // TODO - try SVG pic without definitions?
        const dataURIcode = `export const dataURI = \`${dataURI}\`;\n`;
        const dataURIpath = path.join(target, `${fileName}.ts`);
        await fs.writeFile(dataURIpath, dataURIcode);
        if (variant === def.variants[0]) {
          await fs.writeFile(
            path.join(target, `${noCodeFilename}.ts`),
            dataURIcode
          );
          await fs.writeFile(
            path.join(target, `${noCodeFilename}_small.png`),
            smallPng
          );
          await fs.copy(
            path.join(target, `${fileName}.png`),
            path.join(target, `${noCodeFilename}.png`)
          );
        }
      }
      console.log("action shots rendered for", gameId, variant.desc);
    }
  }
};

export default renderGameActionShots;
