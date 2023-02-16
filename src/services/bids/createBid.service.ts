import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { AppError } from "../../errors/appError";
import { Bid } from "../../entities/Bid.entity";
import { User } from "../../entities/User.entity";

const createBidService = async (
  id: string,
  announcementId: string,
  value: number
) => {
  const announcementsRepository = AppDataSource.getRepository(Announcement);
  const bidsRepository = AppDataSource.getRepository(Bid);
  const usersRepository = AppDataSource.getRepository(User);

  const user = await usersRepository.findOneBy({
    id: id,
  });

  const announcFind = await announcementsRepository.findOneBy({
    id: announcementId,
  });

  if (!announcFind) {
    throw new AppError(404, "Announcement not found");
  }

  if (announcFind.user.id === id) {
    throw new AppError(403, "User can't bid in his own announcement");
  }

  if (announcFind.isAuction === false) {
    throw new AppError(403, "Not auction announcements can't receive bids");
  }

  if (value <= Number(announcFind.initialBid)) {
    throw new AppError(
      403,
      "Bid is lower than initial bid, that is: " + announcFind.initialBid
    );
  }

  const announcBids = await bidsRepository.find({
    where: {
      announcement: {
        id: announcFind.id,
      },
    },
  });

  announcBids.sort(function (a, b) {
    if (Number(a.value) > Number(b.value)) {
      return 1;
    }
    if (Number(a.value) < Number(b.value)) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });

  if (value <= announcBids[announcBids.length - 1].value) {
    throw new AppError(
      403,
      "Can't create bid under or equal the actual bid, that is: " +
        announcBids[announcBids.length - 1].value
    );
  }
  if (announcBids.length === 0) {
    await announcementsRepository.update(announcFind.id, { actualBid: value });
  }

  if (value > announcBids[announcBids.length - 1].value) {
    await announcementsRepository.update(announcFind.id, { actualBid: value });
  }
  const newBid = new Bid();
  newBid.value = value;
  newBid.announcement = announcFind;
  newBid.user = user!;

  const bidCreated = await bidsRepository.save(newBid);

  return bidCreated;
};
export default createBidService;
