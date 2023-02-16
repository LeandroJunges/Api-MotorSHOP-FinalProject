import { Request, Response } from "express";
import deleteAnnouncementService from "../../services/announcements/deleteAnnouncement.service";

const deleteAnnouncementController = async (req: Request, res: Response) => {
  const adId = req.params.announcementId;
  const userId = req.user.id;

  await deleteAnnouncementService(adId, userId);

  return res.status(204).json({});
};

export default deleteAnnouncementController;
