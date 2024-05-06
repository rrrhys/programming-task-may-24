const { formatMetrics, getMetrics } = require("../helpers/metrics");

test("Smoke test get metrics", () => {
  const mock = [
    ["123.456.789.0", null, null, null, "POST test.txt"],
    ["123.456.789.0", null, null, null, "GET /test2.txt"],
  ];
  const metrics = getMetrics(mock);
  expect(metrics.IPs["123.456.789.0"]).toEqual(2);
  expect(metrics.URLs["/test.txt"]).toEqual(1);
  expect(metrics.URLs["/test2.txt"]).toEqual(1);
});
test("Smoke test metrics", () => {
  const mock = {
    IPs: { "123.456.789.0": 4, "123.456.789.1": 2 },
    URLs: { "/example.test": 2, "/abc.jpeg": 6 },
  };
  const formatted = formatMetrics(mock, "test.txt");
  expect(formatted.File).toEqual("test.txt");
  expect(formatted["Top IPs"][0]).toEqual("123.456.789.0");
  expect(formatted["Top 3 URLs"][0]).toEqual("/abc.jpeg");
  expect(formatted["Unique IPs Count"]).toEqual(2);
});
