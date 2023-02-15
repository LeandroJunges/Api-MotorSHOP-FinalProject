import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { AppError } from "../../errors/appError";
import { IAnnouncement } from "../../interfaces/announcements";

const updateAnnouncementService = async (
  data: IAnnouncement,
  adId: string,
  userId: string
) => {
  if (Object.keys(data).length < 1) {
    throw new AppError(409, "you need to pass at least one argument to update");
  }

  const announcementsRepository = AppDataSource.getRepository(Announcement);

  const announcement = await announcementsRepository.findOneBy({ id: adId });

  if (!announcement || announcement.user.id !== userId) {
    throw new AppError(404, "Announcement not found");
  }

  await announcementsRepository.update({ id: adId }, data);

  const updatedAnnouncement = await announcementsRepository.findOneBy({
    id: adId,
  });

  return updatedAnnouncement;
};

export default updateAnnouncementService;
