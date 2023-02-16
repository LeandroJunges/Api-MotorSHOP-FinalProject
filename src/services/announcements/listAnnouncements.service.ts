import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";

const listAnnouncementsService = async (req: any) => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const announcements = await announcementRepository.find();

  const filters: Object = req;
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
    const { user, comments, bids, imgs, ...rest } = ann;

    const { address, password, ...nest } = user;

    refactored.push({ ...rest, user: { ...nest } });
  });

  return refactored;
};
export default listAnnouncementsService;
