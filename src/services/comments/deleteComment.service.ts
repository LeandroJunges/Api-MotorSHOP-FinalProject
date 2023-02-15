import AppDataSource from "../../data-source";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";
import { Comment } from "../../entities/Comments.entity";

const deleteCommentService = async (id: string, commentId: string) => {
  const usersRepository = AppDataSource.getRepository(User);
  const commentsRepository = AppDataSource.getRepository(Comment);

  const user = await usersRepository.findOneBy({
    id: id,
  });

  const comment = await commentsRepository.findOneBy({
    id: commentId,
  });

  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  if (comment.user.id !== id) {
    throw new AppError(403, "Not allowed to delete this comment");
  }

  const commentDeleted = await commentsRepository.delete(comment.id);

  return commentDeleted;
};

export default deleteCommentService;
