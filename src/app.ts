import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import errorHandler from "./engine/middlewares/error";
import { RequestContext } from "@mikro-orm/core";
import { Database } from "./configs/database";
import postRouter from "./engine/routes/posts.route";
import { userRouter } from "./engine/routes";
import { expressjwt } from "express-jwt";
import { getToken } from "./engine/controllers/auth.controller";
// import userRouter from "./engine/routes/users.route";

config();

const app = express();

export const db = new Database();
db.connect().then(async () => {
  db.injectRepositories();
  await db.migrate();
  await db.seed().then(() => console.log("Seeded the database successfully"));
});

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());

app.use((req, res, next) => RequestContext.create(db.em, next));


app.use(expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: [ "HS256" ],
  credentialsRequired: false,
}));


app.use("/auth", getToken);
app.use("/users", userRouter);
app.use("/posts", postRouter);

app.use(errorHandler);

export default app;
