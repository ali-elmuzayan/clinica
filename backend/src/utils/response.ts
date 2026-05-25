import type { Response } from "express";

/**
 * Response metadata type
 */
export type ResponseMeta = Record<string, unknown>;

/**
 * API response type with a custom status code and message
 */
export type ApiResponse<TData = unknown, TError = unknown> = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: TData;
  error?: TError;
  meta?: ResponseMeta;
  timestamp: string;
};

/**
 * Response options with a custom status code and message
 */
type ResponseOptions<TData = unknown, TError = unknown> = {
  message: string;
  data?: TData;
  error?: TError;
  meta?: ResponseMeta;
};

/**
 * Build a response object with a custom status code and message
 */
const buildResponse = <TData = unknown, TError = unknown>(
  success: boolean,
  statusCode: number,
  options: ResponseOptions<TData, TError>
): ApiResponse<TData, TError> => ({
  success,
  statusCode,
  message: options.message,
  data: options.data ?? undefined,
  error: options.error ?? undefined,
  meta: options.meta ?? undefined,
  timestamp: new Date().toISOString()
});

/**
 * Send a response to the client with a custom status code and message
 */
const send = <TData = unknown, TError = unknown>(
  res: Response,
  success: boolean,
  statusCode: number,
  options: ResponseOptions<TData, TError>
) => res.status(statusCode).json(buildResponse(success, statusCode, options));

/**
 * Send a successful response to the client with a custom status code and message
 */
export const ok = <TData = unknown>(
  res: Response,
  message = "Request completed successfully",
  data?: TData,
  meta?: ResponseMeta
) => send(res, true, 200, { message, data, meta });



/**
 * Send a created successfully response to the client with a custom status code and message
 */
export const createdSuccessfully = <TData = unknown>(
  res: Response,
  message = "Resource created successfully",
  data?: TData,
  meta?: ResponseMeta
) => send(res, true, 201, { message, data, meta });


/**
 * Send an updated successfully response to the client with a custom status code and message
 */
export const updatedSuccessfully = <TData = unknown>(
  res: Response,
  message = "Resource updated successfully",
  data?: TData,
  meta?: ResponseMeta
) => send(res, true, 200, { message, data, meta });



/**
 * Send a deleted successfully response to the client with a custom status code and message
 */
export const deletedSuccessfully = <TData = unknown>(
  res: Response,
  message = "Resource deleted successfully",
  data?: TData,
  meta?: ResponseMeta
) => send(res, true, 200, { message, data, meta });


/**
 * Send a no content response to the client with a custom status code and message
 */
export const noContent = (res: Response) => res.status(204).send();


/**
 * Send a bad request error response to the client with a custom status code and message
 */
export const badRequest = <TError = unknown>(
  res: Response,
  message = "Bad request",
  error?: TError,
  meta?: ResponseMeta
) => send(res, false, 400, { message, error, meta });


/**
 * Send an unauthorized error response to the client with a custom status code and message
 */
export const unauthorized = <TError = unknown>(
  res: Response,
  message = "Unauthorized",
  error?: TError,
  meta?: ResponseMeta
) => send(res, false, 401, { message, error, meta });


/**
 * Send a forbidden error response to the client with a custom status code and message
 */
export const forbidden = <TError = unknown>(
  res: Response,
  message = "Forbidden",
  error?: TError,
  meta?: ResponseMeta
) => send(res, false, 403, { message, error, meta });


/**
 * Send a not found error response to the client with a custom status code and message
 */
export const notFound = <TError = unknown>(
  res: Response,
  message = "Resource not found",
  error?: TError,
  meta?: ResponseMeta
) => send(res, false, 404, { message, error, meta });


/**
 * Send a conflict error response to the client with a custom status code and message
 */
export const conflict = <TError = unknown>(
  res: Response,
  message = "Conflict",
  error?: TError,
  meta?: ResponseMeta
) => send(res, false, 409, { message, error, meta });


/**
 * Send a validation error response to the client with a custom status code and message
 */
export const validationError = <TError = unknown>(
  res: Response,
  message = "Validation failed",
  error?: TError,
  meta?: ResponseMeta
) => send(res, false, 422, { message, error, meta });


/**
 * Send a generic error response to the client with a custom status code and message
 */
export const error = <TError = unknown>(
  res: Response,
  message = "Request failed",
  statusCode = 400,
  error?: TError,
  meta?: ResponseMeta
) => send(res, false, statusCode, { message, error, meta });



/**
 * Send a server error response to the client
 */
export const serverError = <TError = unknown>(
  res: Response,
  message = "Internal server error",
  error?: TError,
  meta?: ResponseMeta
) => send(res, false, 500, { message, error, meta });






export const response = {
  ok,
  createdSuccessfully,
  updatedSuccessfully,
  deletedSuccessfully,
  noContent,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  validationError,
  error,
  serverError
};
