import { Express } from "express";
import createAnnoucementeController from "../controllers/announcements/createAnnouncements.controller";
import deleteAnnouncementController from "../controllers/announcements/deleteAnnouncement.controller";
import listAnnouncementsController from "../controllers/announcements/listAnnouncements.controller";
import { listOneAnnouncementController } from "../controllers/announcements/listOneAnnounc.controller";
import soldAnnouncementController from "../controllers/announcements/soldAnnouncement.controller";
import updateAnnouncementController from "../controllers/announcements/updateAnnouncement.controller";
import createUserController from "../controllers/users/createUser.controller";
import loginController from "../controllers/users/login.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const announcementsRoutes = (app: Express) => {
  app.get("/announcements", listAnnouncementsController);
  app.post(
    "/announcements",
    verifyAuthMiddleware,
    createAnnoucementeController
  );
  app.patch(
    "/announcements/:id/sold",
    verifyAuthMiddleware,
    soldAnnouncementController
  );
  app.patch(
    "/announcements/:id",
    verifyAuthMiddleware,
    updateAnnouncementController
  );
  app.delete(
    "/announcements/:id",
    verifyAuthMiddleware,
    deleteAnnouncementController
  );
  app.get(
    "/announcements/:announcementId",
    verifyAuthMiddleware,
    listOneAnnouncementController
  );
};

export default announcementsRoutes;
