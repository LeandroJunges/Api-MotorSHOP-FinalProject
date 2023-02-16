import { Express } from "express";
import announcementsRoutes from "./announcements.routes";
import addressRoutes from "./address.routes";
import usersRoutes from "./users.routes";
import commentsRoutes from "./comments.routes";

const routes = (app: Express) => {
  usersRoutes(app);
  announcementsRoutes(app);
  addressRoutes(app);
  commentsRoutes(app);
};

export { routes };
