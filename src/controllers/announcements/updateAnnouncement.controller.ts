import { Request, Response } from "express";
import updateAnnouncementService from "../../services/announcements/updateAnnouncement.service";

const updateAnnouncementController = async (req: Request, res: Response) => {
  const adId = req.params.announcementId;
  const userId = req.user.id;
  const data = req.body;

  const updatedAnnouncement = await updateAnnouncementService(
    data,
    adId,
    userId
  );

  return res.json(updatedAnnouncement);
};

export default updateAnnouncementController;
