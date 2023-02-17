import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { Image } from "../../entities/Image.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";
import {
  IAnnouncement,
  IAnnouncementCreate,
} from "../../interfaces/announcements";

const updateAnnouncementService = async (
  data: IAnnouncementCreate,
  adId: string,
  userId: string
) => {
  const imagesRepository = AppDataSource.getRepository(Image);
  const announcementsRepository = AppDataSource.getRepository(Announcement);

  const handleImage = async (link: string, annId: string) => {
    const annFound = await announcementsRepository.findOneBy({ id: annId });

    const newImg = new Image();
    newImg.link = link;
    newImg.announcement = annFound!;
    await imagesRepository.save(newImg);
  };

  const { imgs, ...rest } = data;

  const newData: IAnnouncement = { ...rest };

  if (Object.keys(data).length < 1) {
    throw new AppError(409, "You need to pass at least one argument to update");
  }

  const announcement = await announcementsRepository.findOneBy({ id: adId });

  if (!announcement || announcement.user.id !== userId) {
    throw new AppError(404, "Announcement not found");
  }

  if (data.isAuction !== undefined) {
    if (data.isAuction === false && announcement.isAuction === true) {
      if (data.price === undefined) {
        throw new AppError(
          403,
          "To turn an auction into a normal sell, must change 'initialBid' to 'price' keys"
        );
      }
      if (data.initialBid) {
        throw new AppError(
          403,
          "To turn an auction into a normal sell, must change 'initialBid' to 'price' keys"
        );
      }
      //AQUII
      if (imgs) {
        const imagesFound = await imagesRepository.find({
          where: {
            announcement: {
              id: adId,
            },
          },
        });
        imagesFound.forEach(async (e) => {
          await imagesRepository.delete(e);
        });
        let img: string;
        for (img in imgs) {
          await handleImage(
            imgs[img as keyof IAnnouncementCreate["imgs"]],
            adId
          );
        }
      }
      await announcementsRepository.update({ id: adId }, newData);
      await announcementsRepository.update({ id: adId }, { initialBid: 0 });

      const updatedAnnouncement = await announcementsRepository.findOneBy({
        id: adId,
      });

      return updatedAnnouncement;
    }

    if (data.isAuction === true && announcement.isAuction === false) {
      if (data.initialBid === undefined) {
        throw new AppError(
          403,
          "To turn a announcement into an auction, must change 'price' to 'initialBid' key"
        );
      }

      if (data.price) {
        throw new AppError(
          403,
          "To turn a announcement into an auction, must change 'price' to 'initialBid' key"
        );
      }
      //AQUII
      if (imgs) {
        const imagesFound = await imagesRepository.find({
          where: {
            announcement: {
              id: adId,
            },
          },
        });
        imagesFound.forEach(async (e) => {
          await imagesRepository.delete(e);
        });
        let img: string;
        for (img in imgs) {
          await handleImage(
            imgs[img as keyof IAnnouncementCreate["imgs"]],
            adId
          );
        }
      }
      await announcementsRepository.update({ id: adId }, newData);
      await announcementsRepository.update({ id: adId }, { price: 0 });

      const updatedAnnouncement = await announcementsRepository.findOneBy({
        id: adId,
      });

      return updatedAnnouncement;
    }
  }

  if (announcement.isAuction === true) {
    if (data.price) {
      throw new AppError(
        403,
        "Can't set price while announcement is an auction"
      );
    }
  }
  if (announcement.isAuction === false) {
    if (data.initialBid) {
      throw new AppError(
        403,
        "Can't set initialBid while announcement is a normal sell"
      );
    }
  }

  //AQUII
  if (imgs) {
    const imagesFound = await imagesRepository.find({
      where: {
        announcement: {
          id: adId,
        },
      },
    });
    imagesFound.forEach(async (e) => {
      await imagesRepository.delete(e);
    });
    let img: string;
    for (img in imgs) {
      await handleImage(imgs[img as keyof IAnnouncementCreate["imgs"]], adId);
    }
  }
  await announcementsRepository.update({ id: adId }, newData);

  const updatedAnnouncement = await announcementsRepository.findOneBy({
    id: adId,
  });

  return updatedAnnouncement;
};

export default updateAnnouncementService;
