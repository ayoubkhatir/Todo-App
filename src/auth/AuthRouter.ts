import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import {
  loginSchema,
  logoutSchema,
  registerSchema,
} from "../types/UserTypes.js";
import { authController } from "./AuthController.js";
import { setCookie } from "hono/cookie";

export const AuthRouter = new Hono()
  .post("/register", zValidator("json", registerSchema), async (c) => {
    const user = c.req.valid("json");
    const response = await authController.register(user);
    const {
      data: { user: publicUser, session },
    } = response;

    setCookie(c, "sessionId", session.id, {
      httpOnly: true,
      sameSite: "Lax",
      expires: session.expireAt,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });

    return c.json({ publicUser });
  })
  .post("/login", zValidator("json", loginSchema), async (c) => {
    const user = c.req.valid("json");
    const response = await authController.login(user);
    const {
      data: { user: publicUser, session },
    } = response;

    setCookie(c, "sessionId", session.id, {
      httpOnly: true,
      sameSite: "Lax",
      expires: session.expireAt,
      path: "/",
      secure: process.env.NODE_ENV === "production",
    });
    return c.json({ publicUser });
  })
  .post("/logout", zValidator("json", logoutSchema), async (c) => {
    const { userId } = c.req.valid("json");
    const response = authController.logout(userId);
    console.log({ response });
    return c.json({ response, message: "deletion successful" });
  });
