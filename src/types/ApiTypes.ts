import type { HTTPResponseError } from "hono/types";

export enum ErrorCode {
  BAD_REQUEST = "bad request",
  UNAUTHORIZED = "unauthorized",
  FORBIDDEN = "forbidden",
  NOT_FOUND = "not found",
  METHOD_NOT_ALLOWED = "method not allowed",
  CONFLICT = "conflict",
  UNPROCESSABLE_ENTITY = "unprocessable entity",
  TOO_MANY_REQUESTS = "too many requests",
  INTERNAL_SERVER_ERROR = "internal server error",
  SERVICE_UNAVAILABLE = "service unavailable",
}

type HTTPStatus =
  | 200
  | 400
  | 401
  | 403
  | 404
  | 405
  | 409
  | 422
  | 429
  | 500
  | 503;

export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};
