import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { TasksRouter } from "./tasks/TasksRouter.js";
import { serve } from "@hono/node-server";
import { HTTPException } from "hono/http-exception";
import { AppLogger } from "./middleware/AppLogger.js";
import { UsersRouter } from "./users/UsersRouter.js";
import { AuthRouter } from "./auth/AuthRouter.js";
import { authMiddleware } from "./middleware/authMiddleware.js";

const app = new Hono();

app.use("*", cors());

app.use("*", AppLogger());

app.route("/auth", AuthRouter);

// this is just a temporary setup.
app.use("/users/*", authMiddleware);
app.route("/users", UsersRouter);

app.use("/tasks/*", authMiddleware);
app.route("/tasks", TasksRouter);

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return c.json(
      {
        success: false,
        err: {
          name: err.name,
          message: err.message,
          cause: err.cause,
        },
      },
      err.status,
    );
  }
  console.error(err);
  return c.text("Internal Server Error", 500);
});

app.notFound((c) => {
  return c.json(
    {
      success: false,
      err: {
        name: "NotFound",
        message: `Route Not Found : ${c.req.method} ${c.req.path} `,
      },
    },
    404,
  );
});

const port = Number(process.env.PORT) || 3000;

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`Server running on http://localhost:${info.port}`);
});

export default app;
