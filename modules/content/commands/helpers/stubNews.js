const fs = require("fs-extra");
const path = require("path");

const stubNews = date => {
  const out = path.join(__dirname, `../../material/news/${date}`);
  if (fs.existsSync(out)) {
    throw new Error(`News ${date} already exists!`);
  } else if (!date || !date.match(/2[0-9]{3}-[0-9]{2}-[0-9]{2}/)) {
    throw new Error(
      `Illegal news date ${date}, should be formatted as yyyy-mm-dd`
    );
  } else {
    fs.ensureDirSync(out);
    fs.ensureDirSync(path.join(out, `pics`));
    fs.writeFileSync(
      path.join(out, `news.md`),
      `---
id: "${date}"
title: "${date}"
blurb: "Add short description here!"
thumbnail: "picToUseAsThumbnail.png"
---

Omg you can NEVER guess what happened ${date}!! :D
`
    );
  }
};

module.exports = stubNews;