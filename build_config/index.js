const fs = require("fs");
const path = require("path");

const type = process.argv[2];
// destination.txt will be created or overwritten by default.
console.log(process.argv);
const copy = (fileName) => {
  const from = path.join(__dirname, type, fileName);
  const to = path.join(`${fileName}`);

  fs.copyFile(from, to, (err) => {
    if (err) throw err;
    console.log("File " + fileName + " copied.");
  });
};

copy("app.json");
copy("config.js");
