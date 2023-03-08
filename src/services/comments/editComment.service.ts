import {AppDataSource }from "../../data-source";
import { Comment } from "../../entities/Comments.entity";
import { User } from "../../entities/User.entity";
import { AppError } from "../../errors/appError";

export const editCommentService = async (
  id: string,
  description: string,
  commentId: string
) => {
  //   console.log("AAQUII", id, description, commentId);

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
    throw new AppError(403, "Not allowed to edit this comment");
  }

  await commentsRepository.update(comment.id, { description: description });

  const commentUpdated = await commentsRepository.findOneBy({
    id: comment.id,
  });

  const desconstruct = () => {
    const { id, description, createdAt, ...rest } = commentUpdated!;
    return { id, description, createdAt };
  };

  return desconstruct();
};

export default editCommentService;
