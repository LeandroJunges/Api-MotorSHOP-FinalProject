import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";

const listOneAnnouncementService = async (announcementId: string) => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const announcementFind = await announcementRepository.findOneBy({
    id: announcementId,
  });
  if (!announcementFind) {
    throw new AppError(404, "Announcement not found");
  }

  const { user, comments, bids, ...rest } = announcementFind;

  const { address, password, ...nest } = user;

  return { ...rest, user: { ...nest } };
};

export default listOneAnnouncementService;
