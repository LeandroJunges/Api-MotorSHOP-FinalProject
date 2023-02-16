import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listUserService from "../../services/users/listUser.service";

const listUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await listUserService(userId);
  return res.status(200).json(instanceToPlain(user));
};
export default listUserController;
