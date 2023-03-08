"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const Announcement_entity_1 = require("../../entities/Announcement.entity");
const Bid_entity_1 = require("../../entities/Bid.entity");
const appError_1 = require("../../errors/appError");
const deleteBidService = (bidId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const bidsRepository = data_source_1.AppDataSource.getRepository(Bid_entity_1.Bid);
    const announcementsRepository = data_source_1.AppDataSource.getRepository(Announcement_entity_1.Announcement);
    const bidFound = yield bidsRepository.findOneBy({
        id: bidId,
    });
    if (!bidFound) {
        throw new appError_1.AppError(404, "Bid not found");
    }
    if (id !== bidFound.user.id) {
        throw new appError_1.AppError(403, "User don't own this bid");
    }
    const announcement = yield announcementsRepository.findOneBy({
        id: bidFound.announcement.id,
    });
    const bids = yield bidsRepository.find({
        where: {
            announcement: {
                id: announcement.id,
            },
        },
    });
    bids.sort(function (a, b) {
        if (Number(a.value) > Number(b.value)) {
            return -1;
        }
        if (Number(a.value) < Number(b.value)) {
            return 1;
        }
        return 0;
    });
    if (bidFound.id === bids[0].id) {
        announcement.actualBid = bids[1].value;
        yield announcementsRepository.save(announcement);
    }
    yield bidsRepository.delete(bidId);
    return "Done";
});
exports.default = deleteBidService;
