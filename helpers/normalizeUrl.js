const { baseUrl } = require("../config.json");
const normalizeUrl = (logEntry) => {
  /* GET /moved-permanently HTTP/1.1 */

  const urlFields = logEntry.split(" ");

  const url = new URL(urlFields?.[1] ?? "", baseUrl);

  return url.pathname;
};

module.exports = normalizeUrl;
