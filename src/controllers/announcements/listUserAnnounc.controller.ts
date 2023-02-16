import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listUserAnnouncementsService from "../../services/announcements/listUserAnnounc.service";

const listUserAnnouncementsController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const announcements = await listUserAnnouncementsService(userId, req.query);

  return res.status(200).json(instanceToPlain(announcements));
};
export default listUserAnnouncementsController;
