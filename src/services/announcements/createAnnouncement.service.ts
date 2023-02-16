import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { Image } from "../../entities/Image.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";
import {
  IAnnouncement,
  IAnnouncementCreate,
} from "../../interfaces/announcements";

const createAnnoucementeService = async (
  userId: string,
  data: IAnnouncementCreate,
  images?: IAnnouncementCreate["imgs"]
) => {
  const announcementRepository = AppDataSource.getRepository(Announcement);
  const userRepository = AppDataSource.getRepository(User);
  const imagesRepository = AppDataSource.getRepository(Image);

  const user = await userRepository.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  if (!user.isAdvertiser) {
    throw new AppError(401, "Not allowed, change account to seller type");
  }

  const {
    description,
    imgMain,
    isAuction,
    mileage,
    price,
    title,
    vehicleType,
    initialBid,
    year,
    isSold,
  } = data;

  if (isAuction === undefined) {
    throw new AppError(400, "Sell type field required");
  }

  if (isAuction === true) {
    if (
      !(
        description &&
        imgMain &&
        mileage &&
        initialBid &&
        title &&
        vehicleType &&
        year
      )
    ) {
      throw new AppError(
        400,
        "All required field must be filled, if sell type is auction, initialBid is required"
      );
    }
    if (price) {
      throw new AppError(400, "No need for price in sell type auction");
    }

    const announcement = new Announcement();

    const newAnnouncement = await announcementRepository.save({
      ...announcement,
      isAuction: true,
      vehicleType: vehicleType,
      title: title,
      mileage: mileage,
      description: description,
      initialBid: initialBid,
      year: year,
      imgMain: imgMain,
      user: user,
      isSold: false,
    });

    if (images) {
      if (Object.keys(images).length > 6) {
        throw new AppError(403, "Max of six images addable");
      }
      let image: string;
      for (image in images) {
        const newImg = new Image();
        newImg.link = images[image as keyof IAnnouncementCreate["imgs"]];
        newImg.announcement = newAnnouncement;

        await imagesRepository.save(newImg);
      }
    }

    const annReturn = await announcementRepository.findOneBy({
      id: newAnnouncement.id,
    });

    return annReturn;
  }

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
    throw new AppError(
      400,
      "All required field must be filled, if sell type is not auction, price is required"
    );
  }

  if (initialBid) {
    throw new AppError(400, "No need for price in sell type auction");
  }

  const announcement = new Announcement();

  const newAnnouncement = await announcementRepository.save({
    ...announcement,
    isAuction: false,
    vehicleType: vehicleType,
    title: title,
    mileage: mileage,
    description: description,
    price: price,
    year: year,
    imgMain: imgMain,
    user: user,
    isSold: false,
  });

  if (images) {
    if (Object.keys(images).length > 6) {
      throw new AppError(403, "Max of six images addable");
    }
    let image: string;
    for (image in images) {
      const newImg = new Image();
      newImg.link = images[image as keyof IAnnouncementCreate["imgs"]];
      newImg.announcement = newAnnouncement;

      await imagesRepository.save(newImg);
    }
  }

  const annReturn = await announcementRepository.findOneBy({
    id: newAnnouncement.id,
  });

  return annReturn;
};

export default createAnnoucementeService;
