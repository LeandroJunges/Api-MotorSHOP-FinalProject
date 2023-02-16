import { Request, Response } from "express";
import createBidService from "../../services/bids/createBid.service";

const createBidController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { announcementId } = req.params;
  const { value } = req.body;
  const bid = await createBidService(id, announcementId, value);

  return res.status(201).json(bid);
};
export default createBidController;
