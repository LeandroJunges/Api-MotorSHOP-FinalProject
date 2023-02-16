import { Express } from "express";
import editAddressController from "../controllers/address/editAddress.controller";
import createBidController from "../controllers/bids/createBid.controller";
import listAnnouncementBidsController from "../controllers/bids/listAnnouncementBids.controller";
import verifyAuthMiddleware from "../middlewares/verifyAuth.middleware";

const bidsRoutes = (app: Express) => {
  app.post("/bids/:announcementId", verifyAuthMiddleware, createBidController);
  app.get("/bids/:announcementId", listAnnouncementBidsController);
};

export default bidsRoutes;
