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

  const refactUser = (u: any) => {
    const { id, name, img, ...rest } = u;
    return { id, name, img };
  };
  const refacAnn = (a: any) => {
    const { id, title, ...rest } = a;
    return { id, title };
  };

  bids.forEach((bid) => {
    const { id, value, createdAt, announcement, user, ...rest } = bid;

    bidsRefactored.push({
      id,
      value,
      createdAt,
      user: refactUser(user),
      announcement: refacAnn(announcement),
    });
  });

  return bidsRefactored;
};

export default listAnnouncementBidsService;
