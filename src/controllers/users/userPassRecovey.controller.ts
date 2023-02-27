import { Request, Response } from "express";
import userPassRecoveryService from "../../services/users/userPassRecovery.service";

const userPassRecoveryController = async (req: Request, res: Response) => {
  const { email } = req.body;

  const recovery = await userPassRecoveryService(email);

  return res.status(200).json(recovery);
};

export default userPassRecoveryController;
