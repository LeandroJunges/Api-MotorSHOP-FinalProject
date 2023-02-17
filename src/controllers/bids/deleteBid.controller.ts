import { Request, Response } from "express";
import deleteBidService from "../../services/bids/deleteBid.service";

const deleteBidController = async (req: Request, res: Response) => {
  const { bidId } = req.params;
  const { id } = req.user;
  await deleteBidService(bidId, id);
  return res.status(204).json();
};

export default deleteBidController;
