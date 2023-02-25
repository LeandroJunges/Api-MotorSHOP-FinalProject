import { Express } from "express";
import createAnnoucementeController from "../controllers/announcements/createAnnouncements.controller";
import deleteAnnouncementController from "../controllers/announcements/deleteAnnouncement.controller";
import listAnnouncementImagesController from "../controllers/announcements/listAnnouncementImages.controller";
import listAnnouncementsController from "../controllers/announcements/listAnnouncements.controller";
import { listOneAnnouncementController } from "../controllers/announcements/listOneAnnounc.controller";
import listUserAnnouncementsController from "../controllers/announcements/listUserAnnounc.controller";
import soldAnnouncementController from "../controllers/announcements/soldAnnouncement.controller";
import updateAnnouncementController from "../controllers/announcements/updateAnnouncement.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const announcementsRoutes = (app: Express) => {
  app.get("/announcements", listAnnouncementsController);
  app.get(
    "/announcements/:announcementId/images",
    listAnnouncementImagesController
  );
  app.get("/announcements/user/:userId", listUserAnnouncementsController);
  app.post(
    "/announcements",
    verifyAuthMiddleware,
    createAnnoucementeController
  );
  app.patch(
    "/announcements/:announcementId/sold",
    verifyAuthMiddleware,
    soldAnnouncementController
  );
  app.patch(
    "/announcements/:announcementId",
    verifyAuthMiddleware,
    updateAnnouncementController
  );
  app.delete(
    "/announcements/:announcementId",
    verifyAuthMiddleware,
    deleteAnnouncementController
  );
  app.get("/announcements/:announcementId", listOneAnnouncementController);
};

export default announcementsRoutes;
