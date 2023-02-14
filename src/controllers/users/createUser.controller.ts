import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createUserService from "../../services/users/createUser.service";

const createUserController = async (req: Request, res: Response) => {
  // const { name, email, cellphone, password }: IUserRequest = req.body;

  const newUser = await createUserService(req.body);

  return res.status(201).json(instanceToPlain(newUser));
};

export default createUserController;
