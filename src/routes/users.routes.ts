import { Express } from "express";
import createUserController from "../controllers/users/createUser.controller";
import loginController from "../controllers/users/login.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const usersRoutes = (app: Express) => {
  app.post("/login", loginController);
  app.post("/users", createUserController);
  app.patch("/users/:user_id");
  app.delete("/users/:user_id");
  app.get("/users/:user_id");
};

export default usersRoutes;
