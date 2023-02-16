import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { Comment } from "../../entities/Comments.entity";

const listAnnouncementCommentsService = async (announcementId: string) => {
  const commentsRepository = AppDataSource.getRepository(Comment);

  let commentsArray: any = [];

  const comments = await commentsRepository.find({
    where: {
      announcement: {
        id: announcementId,
      },
    },
  });

  comments.forEach((c) => {
    let obj = {};
    const { user, ...rest } = c;
    const { id, name, img, ...nest } = user;
    obj = {
      ...rest,
      user: {
        id,
        name,
        img,
      },
    };
    commentsArray.push(obj);
  });

  return commentsArray;
};

export default listAnnouncementCommentsService;
