import "dotenv/config";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { TasksRouter } from "./tasks/TasksRouter.js";
import { serve } from "@hono/node-server";
import { HTTPException } from "hono/http-exception";
import { AppLogger } from "./middleware/AppLogger.js";

const app = new Hono();

app.use("*", cors());

app.use("*", AppLogger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

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
  // For any other unexpected errors, log and return a generic 500 response
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
