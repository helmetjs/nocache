const assert = require("assert");
const connect = require("connect");
const request = require("supertest");

const nocache = require(".");

async function main() {
  const app = connect();
  app.use((req, res, next) => {
    res.setHeader("ETag", "abc123");
    next();
  });
  app.use(nocache());
  app.use((req, res) => {
    res.end("Hello world!");
  });

  await request(app)
    .get("/")
    .expect("Surrogate-Control", "no-store")
    .expect(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    )
    .expect("Pragma", "no-cache")
    .expect("Expires", "0")
    .expect("ETag", "abc123")
    .expect("Hello world!");

  assert.strictEqual(nocache.name, "nocache");
  assert.strictEqual(nocache().name, "nocache");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
