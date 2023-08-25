import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import AppError from "../../utils/app-error";
import { db } from "../../app";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.auth?.id;
    if (!id) {
      return next(new AppError(401, "You do not have the privileges to access this resource (no id)"));
    }

    // find user in database
    const user = await db.userRepository.findOne({ id });
    if (!user) {
      return next(new AppError(401, "You do not have the privileges to access this resource (not existing)"));
    }

    req.auth = user;
    next();
  } catch (err) {
    console.log(err);
    return next(new AppError(401, "You do not have the privileges to access this resource"));
  }
};
