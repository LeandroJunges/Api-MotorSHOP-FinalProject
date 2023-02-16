import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { Bid } from "../../entities/Bid.entity";
import { AppError } from "../../errors/appError";
import { IBidReturn } from "../../interfaces/bids";

const listAnnouncementBidsService = async (announcementId: string) => {
  const bidsRepository = AppDataSource.getRepository(Bid);
  const announcementsRepository = AppDataSource.getRepository(Announcement);

  const announcement = await announcementsRepository.findOneBy({
    id: announcementId,
  });

  if (!announcement) {
    throw new AppError(404, "Announcement not found");
  }

  const bids = await bidsRepository.find({
    where: {
      announcement: {
        id: announcement.id,
      },
    },
  });

  bids.sort(function (a, b) {
    if (Number(a.value) > Number(b.value)) {
      return -1;
    }
    if (Number(a.value) < Number(b.value)) {
      return 1;
    }
    return 0;
  });

  let bidsRefactored: IBidReturn[] = [];

  bids.forEach((bid) => {
    const { user, ...rest } = bid;
    const { id, name, ...nest } = user;
    bidsRefactored.push({ ...rest, user: { id, name } });
  });

  return bidsRefactored;
};

export default listAnnouncementBidsService;
