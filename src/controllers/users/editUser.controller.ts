import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import editUserService from "../../services/users/editUser.service";

const editUserController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { userId } = req.params;

  const newUser = await editUserService(id, req.body, userId);

  return res.status(200).json(instanceToPlain(newUser));
};

export default editUserController;
