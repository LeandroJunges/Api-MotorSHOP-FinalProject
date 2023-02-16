import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IAnnouncement } from "../../interfaces/announcements";
import createAnnoucementeService from "../../services/announcements/createAnnouncement.service";

const createAnnoucementeController = async (req: Request, res: Response) => {
  const data: IAnnouncement = req.body;
  const userId: string = req.user.id;

  const newAnnouncement = await createAnnoucementeService(data, userId);

  return res.status(201).json(instanceToPlain(newAnnouncement));
};

export default createAnnoucementeController;
