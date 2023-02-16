import { Request, Response } from "express";
import { editCommentService } from "../../services/comments/editComment.service";

const editCommentController = async (req: Request, res: Response) => {
  const { id } = req.user;
  const { commentId } = req.params;
  const { description } = req.body;

  const editedComment = await editCommentService(id, description, commentId);

  return res.status(200).json(editedComment);
};

export default editCommentController;
