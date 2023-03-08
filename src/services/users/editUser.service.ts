import {AppDataSource }from "../../data-source";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";
import { IUserUpdate } from "../../interfaces/users";
import bcrypt from "bcrypt";

export const editUserService = async (
  id: string,
  req: IUserUpdate,
  userId: string
) => {
  const usersRepository = AppDataSource.getRepository(User);

  const userFind = await usersRepository.findOneBy({
    id: id,
  });

  if (!userFind) {
    throw new AppError(404, "User don't exists");
  }
  // if (userId !== id) {
  //   throw new AppError(403, "User can only edit himself");
  // }

  if (req.hasOwnProperty("isActive")) {
    throw new AppError(403, "You can't soft delete user in this route");
  }

  if (req.email) {
    const userFind = await usersRepository.findOneBy({
      email: req.email,
    });
    if (userFind) {
      throw new AppError(400, "E-mail is already being used");
    }
  }

  if (req.cellphone) {
    const userFind = await usersRepository.findOneBy({
      cellphone: req.cellphone,
    });
    if (userFind) {
      throw new AppError(400, "Cellphone is already being used");
    }
  }

  if (req.cpf) {
    const userFind = await usersRepository.findOneBy({
      cpf: req.cpf,
    });
    if (userFind) {
      throw new AppError(400, "Cpf is already being used");
    }
  }

  const hashedPassword = req.password && bcrypt.hashSync(req.password, 10);

  await usersRepository.update(id, { ...req, password: hashedPassword });

  const userUpdated = await usersRepository.findOneBy({
    id: id,
  });

  const { password, ...rest } = userUpdated!;

  return { ...rest, ...req };
};

export default editUserService;
