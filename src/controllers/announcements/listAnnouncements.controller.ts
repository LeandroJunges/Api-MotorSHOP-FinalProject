import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listAnnouncementsService from "../../services/announcements/listAnnouncements.service";

const listAnnouncementsController = async (req: Request, res: Response) => {
  const announcements = await listAnnouncementsService(req.query);

  return res.status(200).json(instanceToPlain(announcements));
};
export default listAnnouncementsController;
