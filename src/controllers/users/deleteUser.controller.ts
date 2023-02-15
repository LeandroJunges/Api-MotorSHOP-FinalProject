import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import deleteUserService from "../../services/users/deleteUser.service";

const deleteUserController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { userId } = req.params;

  if (Object.keys(req.body).length > 0) {
    return res.status(400).json({ message: "No body needed in this request" });
  }

  const user = await deleteUserService(id, userId);

  return res.status(204).json();
};

export default deleteUserController;
