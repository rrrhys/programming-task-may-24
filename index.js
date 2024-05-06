const { exit } = require("process");
const { getMetrics, formatMetrics } = require("./helpers/metrics");
const { getFilename, loadFile } = require("./helpers/file");

const run = async () => {
  const filename = getFilename();

  try {
    const rows = await loadFile(filename);
    const metrics = getMetrics(rows);
    const report = formatMetrics(metrics, filename);
    console.log(report);
    exit(0);
  } catch (e) {
    console.error(e);
  }
};

run();
