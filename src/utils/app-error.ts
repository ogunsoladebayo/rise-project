export default class AppError extends Error {
  public statusCode: any;

  constructor (statusCode: any, message: string) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}