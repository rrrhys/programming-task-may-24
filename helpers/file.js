const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { EOLSeparator } = require("../config.json");
const parseRow = require("./parseRow");

const getFilename = () => {
  const argv = yargs(hideBin(process.argv)).parse();
  const filename = argv._?.[0];

  if (!filename) {
    throw new Error("Please supply filename. E.g. `yarn start access_log.log`");
  }

  if (!fs.existsSync(filename)) {
    throw new Error("File does not exist");
  }

  return filename;
};

const loadFile = (file) => {
  return new Promise((resolve) => {
    let rows = [];

    const stream = fs.createReadStream(file, { encoding: "utf8" });
    stream.on("data", (data) => {
      const inputRows = data.split(EOLSeparator);
      inputRows.forEach((row) => {
        if (!row.trim()) {
          return;
        }

        rows.push(parseRow(row));
      });

      stream.destroy();
    });
    stream.on("close", () => {
      resolve(rows);
    });
  });
};

module.exports = {
  getFilename,
  loadFile,
};
