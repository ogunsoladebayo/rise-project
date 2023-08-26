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
  // email should be valid
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return next(new AppError(400, "Please provide a valid email"));

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
export const getTopUsers = asyncHandler(async (req: Request, res: Response) => {
  //   Fetch the top 3 users with the most posts and, for each of those users, the latest comment they made
  const users = await db.em.getConnection().execute(
    `WITH LatestComments AS (SELECT c.author_id, MAX(c.created_at) AS latestCommentCreatedAt, MAX(c.content) AS latestCommentContent
                                    FROM comment c
                                    GROUP BY c.author_id)

            SELECT u.id, u.name, COUNT(DISTINCT p.id) AS postsCount, lc.latestCommentContent AS latestComment
            FROM "user" u
                LEFT JOIN post p ON u.id = p.author_id
                LEFT JOIN LatestComments lc
                ON u.id = lc.author_id
            GROUP BY u.id, lc.latestCommentContent
            ORDER BY postsCount DESC
            LIMIT 3;
          `);
  res.status(200).json({ success: true, message: "Users fetched successfully", date: users });
});
