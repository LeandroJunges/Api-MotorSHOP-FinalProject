import { Response } from "express";

export class AppError {
  statusCode;
  message;

  constructor(statusCode: number, message: string | object) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const handleError = (err: AppError, res: Response) => {
  const { statusCode, message } = err;

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
