import { IncomingMessage, ServerResponse } from "http";

declare function nocache(): (
  _req: IncomingMessage,
  res: ServerResponse,
  next: () => void
) => void;

export = nocache;
