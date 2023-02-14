import loginService from "../../services/users/login.service";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const token = await loginService(email, password);
  return res.status(200).json(instanceToPlain(token));
};

export default loginController;
