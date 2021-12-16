import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message;
  if (error instanceof Error) message = error.message;
  else message = String(error);
  res.status(500).send(message);
};
