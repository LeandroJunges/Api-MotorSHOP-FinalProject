import { instanceToPlain } from "class-transformer";
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

  return res.status(200).json(instanceToPlain(updatedAnnouncement));
};

export default updateAnnouncementController;
