import { Request } from "jest-express/lib/request";
import { Response } from "jest-express/lib/response";
import { NextFunction } from "jest-express/lib/next";
import { User } from "../../../src/engine/entities";
import { db } from "../../../src/app";
import { createUser, getUsers } from "../../../src/engine/controllers";
import error from "../../../src/engine/middlewares/error";

describe("User Controller", () => {
  describe("createUser controller", () => {
    let request: Request;
    let response: Response;
    let next: NextFunction;

    // Mock database persistence
    db.em = {
      persistAndFlush: jest.fn().mockResolvedValueOnce(undefined),
    } as any;

    beforeEach(() => {
      request = new Request("/users", { headers: "POST" });
      response = new Response();
      next = jest.fn();
    });

    afterEach(() => {
      request.resetMocked();
      response.resetMocked();
      next.mockReset();
    });

    test("should create a user successfully", async () => {
      request.setBody({
          username: "testuser",
          email: "test@example.com",
          password: "testpassword",
        },
      );

      await createUser(request as any, response as any, next);


      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: "User created successfully",
        date: expect.any(User),
      });

      // Validate database persistence
      expect(db.em.persistAndFlush).toHaveBeenCalledWith(expect.any(User));
    });

    test("should return 400 if required fields are missing", async () => {
      request.setBody({});

      // Mock error handler
      next = jest.fn().mockImplementationOnce(error);

      createUser(request as any, response as any, next);

      expect(response.status).not.toHaveBeenCalledWith(400);
      expect(response.json).not.toHaveBeenCalledWith({
        success: false,
        error: "Please provide username and email",
      });
    });
  });

  describe("getUsers controller", () => {
    let request: Request;
    let response: Response;

    // Mock database persistence
    db.userRepository = {
      find: jest.fn().mockResolvedValueOnce([]),
    } as any;

    beforeEach(() => {
      request = new Request("/users", { headers: "GET" });
      response = new Response();
    });

    afterEach(() => {
      request.resetMocked();
      response.resetMocked();
    });

    test("should return 200 and an empty array if there are no users", async () => {
      await getUsers(request as any, response as any);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: "Users fetched successfully",
        date: [],
      });
    });

    test("should return 200 and an array of users if there are users", async () => {
      const users = [
        new User("testuser1", "example1@email.com", "password"),
        new User("testuser2", "example2@email.com", "password"),
      ];
      db.userRepository.find = jest.fn().mockResolvedValueOnce(users);

      await getUsers(request as any, response as any);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        success: true,
        message: "Users fetched successfully",
        date: users,
      });
    });
  });
});