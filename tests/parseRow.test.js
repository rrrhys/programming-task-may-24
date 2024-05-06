const parseRow = require("../helpers/parseRow");

test("Handle regular string", () => {
  const parsed = parseRow(
    '72.44.32.11 - - [11/Jul/2018:17:42:07 +0200] "GET /to-an-error HTTP/1.1" 500 3574 "-" "Mozilla/5.0 (compatible; MSIE 10.6; Windows NT 6.1; Trident/5.0; InfoPath.2; SLCC1; .NET CLR 3.0.4506.2152; .NET CLR 3.5.30729; .NET CLR 2.0.50727) 3gpp-gba UNTRUSTED/1.0"'
  );
  expect(parsed[0]).toBe("72.44.32.11");
  expect(parsed[3]).toBe("11/Jul/2018:17:42:07 +0200");
  expect(parsed[5]).toBe("500");
});
test("Handle malformed strings", () => {
  let parsed;

  parsed = parseRow("72.44.32.11 - - [");

  expect(parsed[0]).toBe("72.44.32.11");
  expect(parsed[3]).toBe("");
  expect(parsed.length).toBe(4);

  parsed = parseRow('72.44.32.11 - - [] [brackets] "tester."');
  expect(parsed[5]).toBe("tester.");
  expect(parsed.length).toBe(6);

  parsed = parseRow('  - - [] "blank ip."');
  expect(parsed[0]).toBe("");
  expect(parsed[1]).toBe("");
  expect(parsed[2]).toBe("-");
  expect(parsed[5]).toBe("blank ip.");
});
