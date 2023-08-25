import { Router } from 'express';
import { addComment } from "../controllers";

export const postRouter = Router();

postRouter.route('/:postId/comments').post(addComment);

