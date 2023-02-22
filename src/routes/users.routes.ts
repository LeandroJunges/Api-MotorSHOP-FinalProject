import { Express } from "express";
import createUserController from "../controllers/users/createUser.controller";
import deleteUserController from "../controllers/users/deleteUser.controller";
import editUserController from "../controllers/users/editUser.controller";
import listUserController from "../controllers/users/listUser.controller";
import loginController from "../controllers/users/login.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const usersRoutes = (app: Express) => {
  app.post("/login", loginController);
  app.post("/users", createUserController);
  app.patch("/users/:userId", verifyAuthMiddleware, editUserController);
  app.delete("/users/:userId", verifyAuthMiddleware, deleteUserController);
  app.get("/users/:userId", listUserController);
};

export default usersRoutes;
