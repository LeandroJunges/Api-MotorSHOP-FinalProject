import AppDataSource from "../../data-source";
import { Image } from "../../entities/Image.entity";

const listAnnouncementImagesService = async (announcementId: string) => {
  const imagesRepository = AppDataSource.getRepository(Image);
  const images = await imagesRepository.find({
    where: {
      announcement: {
        id: announcementId,
      },
    },
  });
  return images;
};
export default listAnnouncementImagesService;
