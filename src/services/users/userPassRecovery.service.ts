import {AppDataSource} from "../../data-source";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/nodemailer.util";

const userPassRecoveryService = async (email: string) => {
  const usersRepository = AppDataSource.getRepository(User);

  if (!email) {
    throw new AppError(400, "Field email is required");
  }

  const user = await usersRepository.findOneBy({ email });

  if (!user) {
    return {
      message: "If there is an account with that email, a link will be sent",
    };
  }

  const passToken = jwt.sign(
    {
      id: user.id,
      email: email,
    },
    process.env.SECRET_KEY as string,
    { expiresIn: "3h" }
  );

  await sendEmail({
    subject: "Recuperação de senha | Motors Shop",
    text: `Use este link para recuperar sua senha: http://localhost:5173/recovery/auth?token=${passToken}. Válido por 3 horas`,
    to: email,
  });

  return {
    message: "If there is an account with that email, a link will be sent",
  };
};
export default userPassRecoveryService;
