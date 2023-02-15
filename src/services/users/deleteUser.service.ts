import AppDataSource from "../../data-source";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";
import { IUserDelete } from "../../interfaces/users";

export const deleteUserService = async (id: string, userId: string) => {
  const usersRepository = AppDataSource.getRepository(User);

  const userFind = await usersRepository.findOneBy({
    id: userId,
  });

  if (!userFind) {
    throw new AppError(404, "User don't exists");
  }
  if (userId !== id) {
    throw new AppError(403, "User can only delete himself");
  }

  await usersRepository.update(id, { isActive: false });

  const userUpdated = await usersRepository.findOneBy({
    id: userId,
  });

  const { password, ...rest } = userUpdated!;

  return { ...rest };
};

export default deleteUserService;
