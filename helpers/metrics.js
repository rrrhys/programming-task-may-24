const { sortByCountDescending } = require(".");

const { logColumns } = require("../config.json");
const normalizeUrl = require("./normalizeUrl");
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

module.exports = { getMetrics, formatMetrics };
