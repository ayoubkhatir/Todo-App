import type { MiddlewareHandler } from "hono";
import { pino } from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty",
  },
});

export const AppLogger = (): MiddlewareHandler => {
  return async (c, next) => {
    const start = Date.now();

    await next();

    logger.info({
      method: c.req.method,
      path: c.req.path,
      url: c.req.url,
      status: c.res.status,
      data: c.res.json,
      ms: Date.now() - start,
    });
  };
};
