import { Request, Response } from "express";
import soldAnnouncementService from "../../services/announcements/soldAnnouncement.service";

const soldAnnouncementController = async (req: Request, res: Response) => {
  const adId = req.params.announcementId;
  const userId = req.user.id;

  const soldAnnoucement = await soldAnnouncementService(adId, userId);

  return res.json(soldAnnoucement);
};

export default soldAnnouncementController;
