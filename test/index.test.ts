import connect from "connect";
import request from "supertest";
import { IncomingMessage, ServerResponse } from "http";

import nocache = require("..");

describe("nocache", () => {
  it("sets headers properly", () => {
    const app = connect();
    app.use((_req: IncomingMessage, res: ServerResponse, next: () => void) => {
      res.setHeader("ETag", "abc123");
      next();
    });
    app.use(nocache());
    app.use((_req: IncomingMessage, res: ServerResponse) => {
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
