import {AppDataSource} from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { AppError } from "../../errors/appError";

const soldAnnouncementService = async (adId: string, userId: string) => {
  const announcementRepository = AppDataSource.getRepository(Announcement);

  const announcement = await announcementRepository.findOneBy({ id: adId });

  if (!announcement || announcement.user.id !== userId) {
    throw new AppError(404, "Announcement not found");
  }

  if (announcement.isSold) {
    throw new AppError(409, "Announcement has already been sold");
  }

  announcement.isSold = true;
  await announcementRepository.save(announcement);

  return { message: "Announcement sold" };
};

export default soldAnnouncementService;
