import { Hono } from "hono";

export const AuthRouter = new Hono().get("", (c) => {
  return c.json("");
});
