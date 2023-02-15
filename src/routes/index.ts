import { Express } from "express";
import announcementsRoutes from "./announcements.routes";
import usersRoutes from "./users.routes";

const routes = (app: Express) => {
  usersRoutes(app);
  announcementsRoutes(app);
};

export { routes };
