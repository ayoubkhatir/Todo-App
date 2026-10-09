import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { sessionsRepository } from "../sessions/sessionsRepo.js";
import { HTTPException } from "hono/http-exception";
import { usersRepository } from "../users/UsersRepo.js";

export const authMiddleware = createMiddleware(async (c, next) => {
  const sessionId = getCookie(c, "sessionId");
  console.log("sessionId:", sessionId);
  if (!sessionId) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  const session = await sessionsRepository.get(sessionId);
  console.log("session:", session);
  if (!session) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  if (session.expireAt <= new Date()) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  const user = await usersRepository.findById(session.userId);
  console.log("user:", user);
  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }
  c.set("user", user);
  c.set("session", session);
  await next();
});
