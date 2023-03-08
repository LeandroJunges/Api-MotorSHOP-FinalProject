import{ AppDataSource} from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { Bid } from "../../entities/Bid.entity";
import { IUserBidReturn } from "../../interfaces/bids";

const listUserBidsService = async (id: string) => {
  const bidsRepository = AppDataSource.getRepository(Bid);
  const bids = await bidsRepository.find({
    where: {
      user: {
        id: id,
      },
    },
  });

  let bidsReturn: IUserBidReturn[] = [];

  const refAnn = (ann: Announcement) => {
    const { id, title, actualBid, ...rest } = ann;
    return { id, title, actualBid };
  };

  bids.forEach((bid) => {
    const { id, value, createdAt, announcement, ...rest } = bid;

    bidsReturn.push({
      id,
      value,
      createdAt,
      announcement: refAnn(announcement),
    });
  });

  return bidsReturn;
};
export default listUserBidsService;
