import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import {
  IAnnouncement,
  IAnnouncementCreate,
} from "../../interfaces/announcements";
import createAnnoucementeService from "../../services/announcements/createAnnouncement.service";

const createAnnoucementeController = async (req: Request, res: Response) => {
  const { imgs, ...rest } = req.body;
  const images: IAnnouncementCreate["imgs"] = imgs;
  const data: IAnnouncementCreate = { ...rest };
  const userId: string = req.user.id;

  const newAnnouncement = await createAnnoucementeService(userId, data, images);

  return res.status(201).json(instanceToPlain(newAnnouncement));
};

export default createAnnoucementeController;
