import { Request, Response } from "express";
import listAnnouncementImagesService from "../../services/announcements/listAnnouncementImages.service";

const listAnnouncementImagesController = async (
  req: Request,
  res: Response
) => {
  const { announcementId } = req.params;

  const images = await listAnnouncementImagesService(announcementId);

  return res.status(200).json(images);
};
export default listAnnouncementImagesController;
