import { Router } from "express";
import { createPost, createUser, getPostsByUser, getTopUsers, getUsers } from "../controllers";
import { protect } from "../middlewares/auth.middleware";

export const userRouter = Router();

userRouter.route("/").get(protect, getUsers).post(createUser);
userRouter.route("/:id/posts").get(protect, getPostsByUser).post(protect, createPost);
userRouter.route("/top").get(protect, getTopUsers);