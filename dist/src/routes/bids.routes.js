"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const createBid_controller_1 = __importDefault(require("../controllers/bids/createBid.controller"));
const deleteBid_controller_1 = __importDefault(require("../controllers/bids/deleteBid.controller"));
const listAnnouncementBids_controller_1 = __importDefault(require("../controllers/bids/listAnnouncementBids.controller"));
const listUserBids_controller_1 = __importDefault(require("../controllers/bids/listUserBids.controller"));
const verifyAuth_middleware_1 = __importDefault(require("../middlewares/verifyAuth.middleware"));
const bidsRoutes = (app) => {
    app.get("/bids/user", verifyAuth_middleware_1.default, listUserBids_controller_1.default);
    app.post("/bids/:announcementId", verifyAuth_middleware_1.default, createBid_controller_1.default);
    app.get("/bids/:announcementId", listAnnouncementBids_controller_1.default);
    app.delete("/bids/:bidId", verifyAuth_middleware_1.default, deleteBid_controller_1.default);
};
exports.default = bidsRoutes;
