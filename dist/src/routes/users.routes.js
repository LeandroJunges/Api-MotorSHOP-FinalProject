"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createUser_controller_1 = __importDefault(require("../controllers/users/createUser.controller"));
const deleteUser_controller_1 = __importDefault(require("../controllers/users/deleteUser.controller"));
const editUser_controller_1 = __importDefault(require("../controllers/users/editUser.controller"));
const listUser_controller_1 = __importDefault(require("../controllers/users/listUser.controller"));
const login_controller_1 = __importDefault(require("../controllers/users/login.controller"));
const userPassRecovey_controller_1 = __importDefault(require("../controllers/users/userPassRecovey.controller"));
const verifyAuth_middleware_1 = __importDefault(require("../middlewares/verifyAuth.middleware"));
const usersRoutes = (app) => {
    app.post("/login", login_controller_1.default);
    app.post("/users", createUser_controller_1.default);
    app.patch("/users", verifyAuth_middleware_1.default, editUser_controller_1.default);
    app.delete("/users/:userId", verifyAuth_middleware_1.default, deleteUser_controller_1.default);
    app.get("/users/:userId", listUser_controller_1.default);
    app.post("/users/recovery", userPassRecovey_controller_1.default);
};
exports.default = usersRoutes;
