"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createAnnouncements_controller_1 = __importDefault(require("../controllers/announcements/createAnnouncements.controller"));
const deleteAnnouncement_controller_1 = __importDefault(require("../controllers/announcements/deleteAnnouncement.controller"));
const listAnnouncementImages_controller_1 = __importDefault(require("../controllers/announcements/listAnnouncementImages.controller"));
const listAnnouncements_controller_1 = __importDefault(require("../controllers/announcements/listAnnouncements.controller"));
const listOneAnnounc_controller_1 = require("../controllers/announcements/listOneAnnounc.controller");
const listUserAnnounc_controller_1 = __importDefault(require("../controllers/announcements/listUserAnnounc.controller"));
const soldAnnouncement_controller_1 = __importDefault(require("../controllers/announcements/soldAnnouncement.controller"));
const updateAnnouncement_controller_1 = __importDefault(require("../controllers/announcements/updateAnnouncement.controller"));
const verifyAuth_middleware_1 = __importDefault(require("../middlewares/verifyAuth.middleware"));
const announcementsRoutes = (app) => {
    app.get("/announcements", listAnnouncements_controller_1.default);
    app.get("/announcements/:announcementId/images", listAnnouncementImages_controller_1.default);
    app.get("/announcements/user/:userId", listUserAnnounc_controller_1.default);
    app.post("/announcements", verifyAuth_middleware_1.default, createAnnouncements_controller_1.default);
    app.patch("/announcements/:announcementId/sold", verifyAuth_middleware_1.default, soldAnnouncement_controller_1.default);
    app.patch("/announcements/:announcementId", verifyAuth_middleware_1.default, updateAnnouncement_controller_1.default);
    app.delete("/announcements/:announcementId", verifyAuth_middleware_1.default, deleteAnnouncement_controller_1.default);
    app.get("/announcements/:announcementId", listOneAnnounc_controller_1.listOneAnnouncementController);
};
exports.default = announcementsRoutes;
