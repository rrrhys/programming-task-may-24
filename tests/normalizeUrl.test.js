const normalizeUrl = require("../helpers/normalizeUrl");

test("normalizesUrl", () => {
  expect(normalizeUrl("GET /access HTTP/1.1")).toBe("/access");
  expect(normalizeUrl("GET http://www.google.com/access HTTP/1.1")).toBe(
    "/access"
  );
  expect(normalizeUrl("GET https://www.example.net/access HTTP/1.1")).toBe(
    "/access"
  );
  expect(normalizeUrl("GET / HTTP/1.1")).toBe("/");
  expect(normalizeUrl("GET  HTTP/1.1")).toBe("/");
  expect(normalizeUrl("")).toBe("/");
});
