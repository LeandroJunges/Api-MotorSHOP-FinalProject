import {AppDataSource} from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { AppError } from "../../errors/appError";

const deleteAnnouncementService = async (adId: string, userId: string) => {
  const announcementRepository = AppDataSource.getRepository(Announcement);

  let announcement = await announcementRepository.findOneBy({ id: adId });

  if (!announcement || announcement.user.id !== userId) {
    throw new AppError(404, "Announcement not found");
  }

  await announcementRepository.delete({ id: adId });

  return;
};

export default deleteAnnouncementService;
