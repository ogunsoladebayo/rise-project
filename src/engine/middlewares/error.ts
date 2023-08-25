import { NextFunction, Request, Response } from "express";
import { ValidationError } from "@mikro-orm/core";
import AppError from "../../utils/app-error";

const errorHandler = (err: Error | AppError, _req: Request, res: Response, _next: NextFunction) => {
  // Log to console for dev
  console.log(err);

  let statusCode = 500;
  let message = "Server Error";
  switch (true) {
    case err instanceof AppError:
      if (err instanceof AppError) statusCode = err.statusCode;
      message = err.message;
      break;

    case err instanceof ValidationError:
      statusCode = 400;
      message = err.message;
      break;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorHandler;
