import { Router } from "express";
import { createPost, createUser, getPostsByUser, getUsers } from "../controllers";

export const userRouter = Router();

userRouter.route("/").get(getUsers).post(createUser);
userRouter.route("/:id/posts").get(getPostsByUser).post(createPost);