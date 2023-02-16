import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { AppError } from "../../errors/appError";
import { IAnnouncement } from "../../interfaces/announcements";

const updateAnnouncementService = async (
  data: IAnnouncement,
  adId: string,
  userId: string
) => {
  if (Object.keys(data).length < 1) {
    throw new AppError(409, "You need to pass at least one argument to update");
  }

  const announcementsRepository = AppDataSource.getRepository(Announcement);

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
      await announcementsRepository.update({ id: adId }, data);
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

      await announcementsRepository.update({ id: adId }, data);
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

  await announcementsRepository.update({ id: adId }, data);

  const updatedAnnouncement = await announcementsRepository.findOneBy({
    id: adId,
  });

  return updatedAnnouncement;
};

export default updateAnnouncementService;
