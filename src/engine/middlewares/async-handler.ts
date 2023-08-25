import { NextFunction, Request, Response } from "express";

export default function asyncHandler(fn: (req: Request<any>, res: Response<any>, next?: NextFunction) => Promise<Response> | Promise<void>) {
	return (req: Request, res: Response, next?: NextFunction) => {
		fn(req, res, next).catch(next);
	};
}
