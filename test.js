const assert = require("node:assert/strict");
const test = require("node:test");

const nocache = require(".");

test("sets expected headers and calls `next`", (_t, done) => {
  const fakeRequest = {};

  const fakeResponse = {
    headers: new Map(),
    setHeader(name, value) {
      this.headers.set(name, value);
    },
  };

  nocache()(fakeRequest, fakeResponse, (...nextArgs) => {
    assert.strictEqual(nextArgs.length, 0);

    assert.deepStrictEqual(
      fakeResponse.headers,
      new Map([
        ["Surrogate-Control", "no-store"],
        ["Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate"],
        ["Expires", "0"],
      ]),
    );

    done();
  });
});

test("names the function and middleware", () => {
  assert.strictEqual(nocache.name, "nocache");
  assert.strictEqual(nocache().name, "nocache");
});
