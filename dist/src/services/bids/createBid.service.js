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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const Announcement_entity_1 = require("../../entities/Announcement.entity");
const appError_1 = require("../../errors/appError");
const Bid_entity_1 = require("../../entities/Bid.entity");
const User_entity_1 = require("../../entities/User.entity");
const createBidService = (id, announcementId, value) => __awaiter(void 0, void 0, void 0, function* () {
    const announcementsRepository = data_source_1.default.getRepository(Announcement_entity_1.Announcement);
    const bidsRepository = data_source_1.default.getRepository(Bid_entity_1.Bid);
    const usersRepository = data_source_1.default.getRepository(User_entity_1.User);
    const user = yield usersRepository.findOneBy({
        id: id,
    });
    const announcFind = yield announcementsRepository.findOneBy({
        id: announcementId,
    });
    if (!announcFind) {
        throw new appError_1.AppError(404, "Announcement not found");
    }
    if (announcFind.user.id === id) {
        throw new appError_1.AppError(403, "User can't bid in his own announcement");
    }
    if (announcFind.isAuction === false) {
        throw new appError_1.AppError(403, "Not auction announcements can't receive bids");
    }
    if (announcFind.isSold === true) {
        throw new appError_1.AppError(403, "Not able to make bids to a sold auction");
    }
    if (value <= Number(announcFind.initialBid)) {
        throw new appError_1.AppError(403, "Bid is lower than initial bid, that is: " + announcFind.initialBid);
    }
    const announcBids = yield bidsRepository.find({
        where: {
            announcement: {
                id: announcFind.id,
            },
        },
    });
    if (announcBids.length > 0) {
        announcBids.sort(function (a, b) {
            if (Number(a.value) > Number(b.value)) {
                return 1;
            }
            if (Number(a.value) < Number(b.value)) {
                return -1;
            }
            // a must be equal to b
            return 0;
        });
        if (value <= announcBids[announcBids.length - 1].value) {
            throw new appError_1.AppError(403, "Can't create bid under or equal the actual bid, that is: " +
                announcBids[announcBids.length - 1].value);
        }
        if (announcBids.length === 0) {
            yield announcementsRepository.update(announcFind.id, {
                actualBid: value,
            });
        }
        if (value > announcBids[announcBids.length - 1].value) {
            yield announcementsRepository.update(announcFind.id, {
                actualBid: value,
            });
        }
    }
    const newBid = new Bid_entity_1.Bid();
    newBid.value = value;
    newBid.announcement = announcFind;
    newBid.user = user;
    const bidCreated = yield bidsRepository.save(newBid);
    const desconstructAnn = (a) => {
        const { id, title } = a, rest = __rest(a, ["id", "title"]);
        return { id, title };
    };
    const desconstruct = () => {
        const { id, value, announcement, user } = bidCreated;
        return { id, value, announcement: desconstructAnn(announcement) };
    };
    return desconstruct();
});
exports.default = createBidService;
