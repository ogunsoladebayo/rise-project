import { NextFunction, Request, Response } from "express";
import { InvalidFieldNameException, NotFoundError, UniqueConstraintViolationException, ValidationError } from "@mikro-orm/core";
import AppError from "../../utils/app-error";

const errorHandler = (err: Error | AppError, _req: Request, res: Response, _next: NextFunction) => {
  // Log to console for dev
  // console.log(err);

  let statusCode = 500;
  let message: string;
  switch (true) {
    case err instanceof AppError:
      if (err instanceof AppError) statusCode = err.statusCode;
      message = err.message;
      break;

    case err instanceof ValidationError:
      statusCode = 400;
      message = "Please check that all fields are properly filled";
      break;

    case err instanceof UniqueConstraintViolationException:
      statusCode = 400;
      message = "Details already exists";
      break;

    case err instanceof InvalidFieldNameException:
      statusCode = 400;
      message = "One or more fields are invalid";
      break;

    case err instanceof NotFoundError:
      statusCode = 404;
      message = "Resource not found";
      break;

    default:
      statusCode = 500;
      message = "Server Error";
  }

  res.status(statusCode).json({
    success: false,
    message,
    error: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};

export default errorHandler;
