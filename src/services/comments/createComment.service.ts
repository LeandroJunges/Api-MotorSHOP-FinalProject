import AppDataSource from "../../data-source";
import { Announcement } from "../../entities/Announcement.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";
import { Comment } from "../../entities/Comments.entity";

const createCommentService = async (
  id: string,
  announcementId: string,
  description: string
) => {
  const usersRepository = AppDataSource.getRepository(User);
  const announcRepository = AppDataSource.getRepository(Announcement);
  const commentsRepository = AppDataSource.getRepository(Comment);

  const user = await usersRepository.findOneBy({
    id: id,
  });

  const announcement = await announcRepository.findOneBy({
    id: announcementId,
  });

  if (!announcement) {
    throw new AppError(404, "Announcement not found");
  }

  const comment = new Comment();
  comment.description = description;
  comment.announcement = announcement;
  comment.user = user!;

  const newComment = await commentsRepository.save(comment);

  const desconstruct = () => {
    const { id, description, createdAt, ...rest } = newComment;
    return { id, description, createdAt };
  };

  return desconstruct();
};

export default createCommentService;
