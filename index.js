const fs = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const { exit } = require("process");
const { formatMetrics, getMetrics, loadFile } = require("./helpers");

const run = async () => {
  const argv = yargs(hideBin(process.argv)).parse();
  const filename = argv._?.[0];

  if (!filename) {
    throw new Error("Please supply filename. E.g. `yarn start access_log.log`");
  }

  if (!fs.existsSync(filename)) {
    throw new Error("File does not exist");
  }
  try {
    const rows = await loadFile(filename);
    const metrics = getMetrics(rows);
    const report = formatMetrics(metrics, filename);
    console.log(report);
    exit(0);
  } catch (e) {
    console.log("Error");
    console.error(e);
  }
};

run();
