import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";
import {
  IAnnouncement,
  IAnnouncementCreate,
} from "../../interfaces/announcements";

const createAnnoucementeService = async (
  data: IAnnouncementCreate,
  userId: string
) => {
  const {
    description,
    imgMain,
    isAuction,
    mileage,
    price,
    title,
    vehicleType,
    year,
    isSold,
  } = data;

  if (
    !(
      description &&
      imgMain &&
      mileage &&
      price &&
      title &&
      vehicleType &&
      year
    )
  ) {
    throw new AppError(400, "All required field must be filled");
  }

  const announcementRepository = AppDataSource.getRepository(Announcement);
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (!user.isAdvertiser) {
    throw new AppError(401, "Not allowed");
  }

  const announcement = new Announcement();

  const newAnnouncement = await announcementRepository.save({
    ...announcement,
    ...data,
    user: user,
    isSold: false,
    isAuction: isAuction ? isAuction : false,
  });

  return newAnnouncement;
};

export default createAnnoucementeService;
