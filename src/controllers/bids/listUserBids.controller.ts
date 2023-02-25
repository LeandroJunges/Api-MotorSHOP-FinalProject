import { Request, Response } from "express";
import listUserBidsService from "../../services/bids/listUserBids.service";

const listUserBidsController = async (req: Request, res: Response) => {
  const { id } = req.user;

  const userBids = await listUserBidsService(id);
  return res.status(200).json(userBids);
};
export default listUserBidsController;
