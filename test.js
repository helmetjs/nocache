const assert = require("assert");

const nocache = require(".");

const fakeRequest = {};

const fakeResponse = {
  headers: new Map(),
  setHeader(name, value) {
    this.headers.set(name, value);
  },
};

let wasNextCalled = false;
const fakeNext = (...args) => {
  wasNextCalled = true;
  assert.strictEqual(args.length, 0);
};

nocache()(fakeRequest, fakeResponse, fakeNext);

assert.deepStrictEqual(
  fakeResponse.headers,
  new Map([
    ["Surrogate-Control", "no-store"],
    ["Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate"],
    ["Expires", "0"],
  ]),
);
assert(wasNextCalled);

assert.strictEqual(nocache.name, "nocache");
assert.strictEqual(nocache().name, "nocache");
