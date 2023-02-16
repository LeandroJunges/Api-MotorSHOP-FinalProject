import { Request, Response } from "express";
import listAnnouncementBidsService from "../../services/bids/listAnnouncBids.service";

const listAnnouncementBidsController = async (req: Request, res: Response) => {
  const { announcementId } = req.params;
  const bids = await listAnnouncementBidsService(announcementId);
  return res.status(200).json(bids);
};
export default listAnnouncementBidsController;
