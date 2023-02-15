import loginService from "../../services/users/login.service";
import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "E-mail and password required" });
  }

  const token = await loginService(email, password);
  return res.status(200).json(instanceToPlain(token));
};

export default loginController;
