import { Request, Response } from "express";
import { editCommentService } from "../../services/comments/editComment.service";
import listAnnouncementCommentsService from "../../services/comments/listAnnComments.service";

const listAnnouncementCommentsController = async (
  req: Request,
  res: Response
) => {
  const { announcementId } = req.params;

  const comments = await listAnnouncementCommentsService(announcementId);

  return res.status(200).json(comments);
};

export default listAnnouncementCommentsController;
