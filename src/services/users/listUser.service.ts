import {AppDataSource} from "../../data-source";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";

const listUserService = (userId: string) => {
  const usersRepository = AppDataSource.getRepository(User);
  const user = usersRepository.findOneBy({
    id: userId,
  });
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};
export default listUserService;
