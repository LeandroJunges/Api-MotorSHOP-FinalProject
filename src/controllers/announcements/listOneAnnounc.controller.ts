import { Request, Response } from "express";
import listOneAnnouncementService from "../../services/announcements/listOneAnnounc.service";

export const listOneAnnouncementController = async (
  req: Request,
  res: Response
) => {
  const { announcementId } = req.params;
  const announcement = await listOneAnnouncementService(announcementId);
  return res.status(200).json(announcement);
};
