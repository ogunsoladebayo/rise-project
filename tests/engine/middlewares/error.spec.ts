import errorHandler from "../../../src/engine/middlewares/error";
import { Response } from "jest-express/lib/response";
import AppError from "../../../src/utils/app-error";

let response: any;

describe("errorHandler", () => {
  // const res = mockResponse();
  beforeEach(() => {
    response = new Response();
  });

  afterEach(() => {
    response.resetMocked();
  });

  test("sets the status code to 500 if no status code is provided", () => {
    const err = new Error("This is an error");


    errorHandler(err, undefined, response, undefined);

    expect(response.status).toHaveBeenCalledWith(500);
  });

  test("sets the status code to the provided status code if it is provided", () => {
    const statusCode = 400;
    const err = new AppError(statusCode, "This is an error");


    errorHandler(err, undefined, response, undefined);

    expect(response.status).toHaveBeenCalledWith(statusCode);
  });
});