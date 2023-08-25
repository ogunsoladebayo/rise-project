import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/async-handler";
import { db } from "../../app";

export const getToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  if (!username || !password) return next(new Error("Please provide username and password"));

  const user = await db.userRepository.findOne({ name: username });
  if (!user) return next(new Error("Invalid username or password"));

  const passwordValid = await user.matchPassword(password);
  if (!passwordValid) return next(new Error("Invalid username or password"));

  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, message: "Token generated successfully", data: token });
});