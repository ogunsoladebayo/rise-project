import { Router } from "express";
import { addComment } from "../controllers";
import { protect } from "../middlewares/auth.middleware";

const postRouter = Router();

postRouter.route("/:postId/comments").post(protect, addComment);

export default postRouter;

