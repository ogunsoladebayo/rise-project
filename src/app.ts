import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "dotenv";
import errorHandler from "./engine/middlewares/error";
import { RequestContext } from "@mikro-orm/core";
import { Database } from "./configs/database";

config();

const app = express();

( async () => {
	await Database.connect();
	await Database.migrate();
} )();

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => RequestContext.create(Database.orm.em, next));

app.use(cors());
app.use(helmet());

app.use(errorHandler);

export default app;
