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
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("../../data-source");
const Announcement_entity_1 = require("../../entities/Announcement.entity");
const User_entity_1 = require("../../entities/User.entity");
const appError_1 = require("../../errors/appError");
const listUserAnnouncementsService = (userId, req) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
    const announcementsRepository = data_source_1.AppDataSource.getRepository(Announcement_entity_1.Announcement);
    const userFind = yield usersRepository.findOneBy({
        id: userId,
    });
    if (!userFind) {
        throw new appError_1.AppError(404, "User not found");
    }
    const announcements = yield announcementsRepository.find({
        where: {
            user: {
                id: userId,
            },
        },
    });
    const filters = req;
    const filteredAnnouncements = announcements.filter((announcement) => {
        let key;
        let isValid = true;
        for (key in filters) {
            let stringAnnouncement = announcement[key].toString();
            let stringFilter = filters[key].toString();
            isValid = isValid && stringAnnouncement === stringFilter;
        }
        return isValid;
    });
    let refactored = [];
    filteredAnnouncements.forEach((ann) => {
        const { user, comments, bids } = ann, rest = __rest(ann, ["user", "comments", "bids"]);
        const { address, password } = user, nest = __rest(user, ["address", "password"]);
        refactored.push(Object.assign(Object.assign({}, rest), { user: Object.assign({}, nest) }));
        // refactored.push({ ...rest });
    });
    return refactored;
});
exports.default = listUserAnnouncementsService;
