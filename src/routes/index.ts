import { Express } from "express";
import addressRoutes from "./address.routes";
import usersRoutes from "./users.routes";

const routes = (app: Express) => {
  usersRoutes(app);
  addressRoutes(app)
};

export { routes };
