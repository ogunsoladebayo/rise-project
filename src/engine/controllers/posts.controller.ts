import { NextFunction, Request, Response } from "express";
import asyncHandler from "../middlewares/async-handler";
import { db } from "../../app";
import { Comment, Post } from "../entities";
import AppError from "../../utils/app-error";


/**
 * @route POST /users/:id/posts
 * @access Public
 * @description Create a new post for a user.
 */
export const createPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.id);
  const { title, content } = req.body;

  if (Number.isNaN(userId)) return next(new AppError(400, "Invalid user id"));

  if (!title || !content) return next(new AppError(400, "Please provide title and content"));

  const user = await db.userRepository.findOneOrFail({ id: userId });
  const post = new Post(title, content);
  post.author = user;

  await db.em.persistAndFlush(post);

  res.status(201).json({ success: true, message: "Post created successfully", data: post });
});

/**
 * @route GET /users/:id/posts
 * @access Public
 * @description Retrieve all posts of a user.
 */
export const getPostsByUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const userId = parseInt(req.params.id);
  if (Number.isNaN(userId)) return next(new AppError(400, "Invalid user id"));

  const user = await db.userRepository.findOneOrFail({ id: userId }, { populate: [ "posts" ] });
  res.status(200).json({ success: true, message: "Posts fetched successfully", data: user.posts.getItems() });
});

/**
 * @route GET /posts/:postId/comments
 * @access Public
 * @description Retrieve all posts of a user.
 */
export const addComment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const postId = parseInt(req.params.postId);
  const { userId, content } = req.body;

  if (Number.isNaN(postId)) return next(new AppError(400, "Invalid post id"));
  if (Number.isNaN(parseInt(userId)) || !content) return next(new AppError(400, "Please provide valid user id and content"));

  const post = await db.postRepository.findOneOrFail({ id: ( postId ) });
  const user = await db.userRepository.findOneOrFail({ id: parseInt(userId) });

  const comment = new Comment(content);
  comment.post = post;
  comment.author = user;
  await db.em.persistAndFlush(comment);

  res.status(201).json({ success: true, message: "Comment added successfully", data: { id: comment.id, content: comment.content } });
});
