import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { Bid } from "../../entities/Bid.entity";
import { AppError } from "../../errors/appError";

const deleteBidService = async (bidId: string, id: string) => {
  const bidsRepository = AppDataSource.getRepository(Bid);
  const announcementsRepository = AppDataSource.getRepository(Announcement);

  const bidFound = await bidsRepository.findOneBy({
    id: bidId,
  });

  if (!bidFound) {
    throw new AppError(404, "Bid not found");
  }

  if (id !== bidFound.user.id) {
    throw new AppError(403, "User don't own this bid");
  }

  const announcement = await announcementsRepository.findOneBy({
    id: bidFound.announcement.id,
  });

  const bids = await bidsRepository.find({
    where: {
      announcement: {
        id: announcement!.id,
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

  if (bidFound.id === bids[0].id) {
    announcement!.actualBid = bids[1].value;
    await announcementsRepository.save(announcement!);
  }

  await bidsRepository.delete(bidId);

  return "Done";
};

export default deleteBidService;
