"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createComment_controller_1 = __importDefault(require("../controllers/comments/createComment.controller"));
const deleteComment_controller_1 = __importDefault(require("../controllers/comments/deleteComment.controller"));
const editComment_controller_1 = __importDefault(require("../controllers/comments/editComment.controller"));
const listAnnComments_controller_1 = __importDefault(require("../controllers/comments/listAnnComments.controller"));
const verifyAuth_middleware_1 = __importDefault(require("../middlewares/verifyAuth.middleware"));
const commentsRoutes = (app) => {
    app.post("/comments/:announcementId", verifyAuth_middleware_1.default, createComment_controller_1.default);
    app.patch("/comments/:commentId", verifyAuth_middleware_1.default, editComment_controller_1.default);
    app.delete("/comments/:commentId", verifyAuth_middleware_1.default, deleteComment_controller_1.default);
    app.get("/comments/:announcementId", listAnnComments_controller_1.default);
};
exports.default = commentsRoutes;
