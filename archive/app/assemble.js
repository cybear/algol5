var fs = require("fs-extra");

fs.removeSync("dist");

fs.copySync(__dirname + "/../graphics/dist/boards.css", __dirname + "/dist/boards.css");
fs.copySync(__dirname + "/../graphics/dist/pieces", __dirname + "/dist/pieces");
fs.copySync(__dirname + "/../session/dist/algol_worker.js", __dirname + "/dist/algol_worker.js");
fs.copySync(__dirname + "/styles.css", __dirname + "/dist/styles.css");

var html = fs.readFileSync(__dirname + "/template.html").toString();

fs.writeFileSync(__dirname + "/dist/index.html", html.replace("BUNDLEPATH", "bundle.js"));