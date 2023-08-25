import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import errorHandler from "./engine/middlewares/error";
import { RequestContext } from "@mikro-orm/core";
import { Database } from "./configs/database";
import { postRouter, userRouter } from "./engine/routes";

config();

const app = express();

export const db = new Database();
( async () => {
  await db.connect();
  await db.migrate();
  db.injectRepositories();
} )();

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());

app.use((req, res, next) => RequestContext.create(db.em, next));

app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use(errorHandler);

export default app;
