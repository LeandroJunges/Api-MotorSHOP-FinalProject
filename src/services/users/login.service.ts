import { User } from "../../entities/User.entity";
import AppDataSource from "../../data-source";
import { AppError } from "../../errors/appError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const loginService = async (email: string, password: string) => {
  const usersRepository = AppDataSource.getRepository(User);

  const user: User | null = await usersRepository.findOne({
    where: { email: email },
  });

  if (!user) {
    throw new AppError(403, "Incorrect email or password");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError(403, "Incorrect email or password");
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.SECRET_KEY!,
    { expiresIn: "24h" }
  );
  return { user, token };
};

export default loginService;
