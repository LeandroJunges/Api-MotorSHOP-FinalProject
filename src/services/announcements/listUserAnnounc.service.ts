import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";

const listUserAnnouncementsService = async (userId: string, req: Object) => {
  const usersRepository = AppDataSource.getRepository(User);
  const announcementsRepository = AppDataSource.getRepository(Announcement);
  const userFind = await usersRepository.findOneBy({
    id: userId,
  });
  if (!userFind) {
    throw new AppError(404, "User not found");
  }

  const announcements = await announcementsRepository.find({
    where: {
      user: {
        id: userId,
      },
    },
  });

  const filters = req;
  const filteredAnnouncements = announcements.filter((announcement) => {
    let key: string;
    let isValid = true;

    for (key in filters) {
      let stringAnnouncement = announcement[key as keyof Object].toString();
      let stringFilter = filters[key as keyof Object].toString();

      isValid = isValid && stringAnnouncement === stringFilter;
    }

    return isValid;
  });

  let refactored: any[] = [];

  filteredAnnouncements.forEach((ann) => {
    const { user, comments, imgs, ...rest } = ann;

    const { address, password, ...nest } = user;

    // refactored.push({ ...rest, user: { ...nest } });
    refactored.push({ ...rest });
  });

  return refactored;
};
export default listUserAnnouncementsService;
