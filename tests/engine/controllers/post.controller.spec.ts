import { Request } from "jest-express/lib/request";
import { Response } from "jest-express/lib/response";
import { NextFunction } from "jest-express/lib/next";
import { Post } from "../../../src/engine/entities";
import { db } from "../../../src/app";
import { createPost, getPostsByUser } from "../../../src/engine/controllers";
import error from "../../../src/engine/middlewares/error";

describe("Post Controller", () => {
  let request: Request;
  let response: Response;
  let next: NextFunction;

  // Mock database persistence
  db.em = {
    persistAndFlush: jest.fn().mockResolvedValueOnce(undefined),
  } as any;
  describe("createPost controller", () => {

    beforeEach(() => {
      request = new Request("/users/:id/posts", { headers: "POST" });
      response = new Response();
      next = jest.fn();
    });

    afterEach(() => {
      request.resetMocked();
      response.resetMocked();
      next.mockReset();
    });

    test("should create a post successfully", async () => {
      request.params.id = "1";
      request.setBody({
          title: "testpost",
          body: "testbody",
        },
      );

      await createPost(request as any, response as any, next);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: "Post created successfully",
        data: expect.any(Post),
      });
    });

    test("should return Invalid user id", async () => {
      request.params.id = "string";
      request.setBody({
        title: "testpost",
        body: "testbody",
      });

      // Mock error handler
      next = jest.fn().mockImplementationOnce(error);

      createPost(request as any, response as any, next);

      expect(response.status).toHaveBeenCalledWith(400);
      expect(response.json).toHaveBeenCalledWith({
        success: false,
        message: "Invalid user id",
      });
    });
  });

  describe("getPosts controller", () => {

    beforeEach(() => {
      request = new Request("/users/:id/posts", { headers: "GET" });
      response = new Response();
      next = jest.fn();
    });

    afterEach(() => {
      request.resetMocked();
      response.resetMocked();
      next.mockReset();
    });

    test("should get all posts for a user", async () => {
      request.params.id = "1";
      getPostsByUser(request as any, response as any, next);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: "Posts fetched successfully",
        data: expect.any(Array),
      });
    });
  });
});