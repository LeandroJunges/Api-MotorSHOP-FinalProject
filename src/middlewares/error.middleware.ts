import { AppError } from "../errors/appError";
import { Request, Response, NextFunction } from "express";

const errorMiddleWare = (
  error: any,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ code: error.statusCode, message: error.message });
  }
  return res
    .status(500)
    .json({ message: "Internal Server Error", details: error.message });
};

export default errorMiddleWare;
