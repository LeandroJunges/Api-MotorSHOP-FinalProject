import { Express } from "express";
import createCommentController from "../controllers/comments/createComment.controller";
import deleteCommentController from "../controllers/comments/deleteComment.controller";
import editCommentController from "../controllers/comments/editComment.controller";
import listAnnouncementCommentsController from "../controllers/comments/listAnnComments.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const commentsRoutes = (app: Express) => {
  app.post(
    "/comments/:announcementId",
    verifyAuthMiddleware,
    createCommentController
  );
  app.patch(
    "/comments/:commentId",
    verifyAuthMiddleware,
    editCommentController
  );
  app.delete(
    "/comments/:commentId",
    verifyAuthMiddleware,
    deleteCommentController
  );
  app.get("/comments/:announcementId", listAnnouncementCommentsController);
};
export default commentsRoutes;
