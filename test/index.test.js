const connect = require("connect");
const request = require("supertest");

const nocache = require("..");

describe("nocache", () => {
  it("sets headers properly", () => {
    const app = connect();
    app.use((req, res, next) => {
      res.setHeader("ETag", "abc123");
      next();
    });
    app.use(nocache());
    app.use((req, res) => {
      res.end("Hello world!");
    });

    return request(app)
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
  });

  it("names its function and middleware", () => {
    expect(nocache.name).toBe("nocache");
    expect(nocache().name).toBe("nocache");
  });
});
