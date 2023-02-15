import { Request, Response } from "express";
import createCommentService from "../../services/comments/createComment.service";

const createCommentController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { announcementId } = req.params;
  const { description } = req.body;

  const newComment = await createCommentService(
    id,
    announcementId,
    description
  );

  return res.status(201).json(newComment);
};

export default createCommentController;
