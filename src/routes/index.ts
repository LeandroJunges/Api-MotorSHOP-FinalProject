import { Express } from "express";
import usersRoutes from "./users.routes";

const routes = (app: Express) => {
  usersRoutes(app);
};

export { routes };
