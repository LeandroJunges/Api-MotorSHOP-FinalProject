import { Request, Response } from "express";
import deleteCommentService from "../../services/comments/deleteComment.service";

const deleteCommentController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { commentId } = req.params;

  await deleteCommentService(id, commentId);

  return res.status(204).json();
};

export default deleteCommentController;
