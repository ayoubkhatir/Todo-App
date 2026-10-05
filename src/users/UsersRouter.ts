import { Hono } from "hono";

export const UsersRouter = new Hono().get("", (c) => {
  return c.json("");
});
