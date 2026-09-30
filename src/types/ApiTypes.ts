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
  | 400 | 401 | 403 | 404 | 405
  | 409 | 422 | 429
  | 500 | 503


export type SuccessResponse<T> = {
    success:true
    message:string
    data:T
}
export type ErrorResponse={
    success:false
    message:string
    code:string
    status:HTTPStatus
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse




export function Success<T>(message:string,data:T):SuccessResponse<T>{
    return {success:true,message,data}
}
export function Fail(message:string,code:string,status:HTTPStatus):ErrorResponse{
    return {success:false,message,code,status}
}