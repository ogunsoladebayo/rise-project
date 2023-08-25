import { NextFunction, Request, Response } from "express";
import { User } from "../entities";
import asyncHandler from "../middlewares/async-handler";
import { db } from "../../app";
import AppError from "../../utils/app-error";


/**
 * @route POST /users
 * @access Public
 * @description Create a new user.
 */
export const createUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return next(new AppError(400, "Please provide username and email"));
  // name should not contain spaces
  if (/^\s*$/.test(name)) return next(new AppError(400, "Username should not contain spaces"));

  const user = new User(name, email, password);
  await db.em.persistAndFlush(user);
  res.status(201).json({ success: true, message: "User created successfully", date: user });
});

/**
 * @route GET /users
 * @access Public
 * @description Retrieve all users.
 */
export const getUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await db.userRepository.find({});
  res.status(200).json({ success: true, message: "Users fetched successfully", date: users });
});

/**
 * @route GET /users/top
 * @access Public
 * @description Retrieve top 3 users with the most posts and, for each of those users, the latest comment they made.
 */
// export const getTopUsers = asyncHandler(async (req: Request, res: Response) => {
//   const
// });
