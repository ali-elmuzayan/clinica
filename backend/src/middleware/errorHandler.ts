import type { ErrorRequestHandler } from "express";
import mongoose from "mongoose";
import { ZodError, flattenError } from "zod";
import { env } from "../config/env.js";
import { response } from "../utils/response.js";

export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  void _next;
  if (err instanceof AppError) {
    return response.error(res, err.message, err.statusCode);
  }

  if (err instanceof ZodError) {
    return response.validationError(
      res,
      "Validation failed",
      flattenError(err).fieldErrors
    );
  }

  if (err instanceof mongoose.Error.ValidationError) {
    const details = Object.values(err.errors).map((validationError) => ({
      field: validationError.path,
      message: validationError.message
    }));

    return response.validationError(res, "Validation failed", details);
  }

  if (err instanceof mongoose.Error.CastError) {
    return response.badRequest(
      res,
      `Invalid value for ${err.path}`,
      { value: err.value }
    );
  }

  if (err instanceof mongoose.mongo.MongoServerError && err.code === 11000) {
    return response.conflict(res, "Duplicate value error", err.keyValue);
  }

  const isProduction = env.nodeEnv === "production";
  const fallbackError = err instanceof Error ? err : new Error("Unknown error");

  return response.serverError(
    res,
    "Internal server error",
    isProduction
      ? undefined
      : {
          message: fallbackError.message,
          stack: fallbackError.stack
        }
  );
};