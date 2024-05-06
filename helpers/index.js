const fs = require("fs");

const normalizeUrl = require("./normalizeUrl");
const parseRow = require("./parseRow");

const { logColumns, EOLSeparator } = require("../config.json");

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

const sortByCountDescending = (a, b) => {
  const aCount = a[1];
  const bCount = b[1];
  if (aCount < bCount) return 1;
  if (aCount > bCount) return -1;
  return 0;
};

const formatMetrics = (rawMetrics, file) => {
  const IPsDescending = Object.entries(rawMetrics.IPs).sort(
    sortByCountDescending
  );
  const URLsDescending = Object.entries(rawMetrics.URLs).sort(
    sortByCountDescending
  );

  const metrics = {};
  metrics["File"] = file;
  metrics["Top IPs"] = IPsDescending.slice(0, 3).map((element) => element[0]);
  metrics["Top 3 URLs"] = URLsDescending.slice(0, 3).map(
    (element) => element[0]
  );
  metrics["Unique IPs Count"] = IPsDescending.length;

  return metrics;
};

const getMetrics = (logData) => {
  let rawMetrics = {
    IPs: {},
    URLs: {},
  };

  logData.forEach((logItem) => {
    if (!rawMetrics.IPs[logItem[logColumns.IP]]) {
      rawMetrics.IPs[logItem[logColumns.IP]] = 0;
    }
    rawMetrics.IPs[logItem[logColumns.IP]] += 1;

    const url = normalizeUrl(logItem[logColumns.URL]);
    if (!rawMetrics.URLs[url]) {
      rawMetrics.URLs[url] = 0;
    }
    rawMetrics.URLs[url] += 1;
  });

  return rawMetrics;
};

module.exports = {
  sortByCountDescending,
  formatMetrics,
  getMetrics,
  loadFile,
};
