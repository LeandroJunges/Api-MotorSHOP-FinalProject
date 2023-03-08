import { User } from "../../entities/User.entity";
import {AppDataSource} from "../../data-source";
import { AppError } from "../../errors/appError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async (email: string, password: string) => {
  const usersRepository = AppDataSource.getRepository(User);

  const userFind: User | null = await usersRepository.findOneBy({
    email: email,
  });

  if (!userFind) {
    throw new AppError(403, "Incorrect email or password");
  }

  const passwordMatch = await bcrypt.compare(password, userFind.password);

  if (!passwordMatch) {
    throw new AppError(403, "Incorrect email or password");
  }

  if (userFind.isActive === false) {
    await usersRepository.update(userFind.id, { isActive: true });
  }

  const token = jwt.sign(
    {
      id: userFind.id,
      email: userFind.email,
      isAdvertiser: userFind.isAdvertiser,
    },
    process.env.SECRET_KEY!,
    { expiresIn: "24h" }
  );

  const user: User | null = await usersRepository.findOne({
    where: { email: email },
  });

  return { user, token };
};

export default loginService;
