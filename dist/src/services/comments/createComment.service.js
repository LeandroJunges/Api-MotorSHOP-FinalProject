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
const Comments_entity_1 = require("../../entities/Comments.entity");
const createCommentService = (id, announcementId, description) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
    const announcRepository = data_source_1.AppDataSource.getRepository(Announcement_entity_1.Announcement);
    const commentsRepository = data_source_1.AppDataSource.getRepository(Comments_entity_1.Comment);
    const user = yield usersRepository.findOneBy({
        id: id,
    });
    if (!description) {
        throw new appError_1.AppError(400, "Description field is required");
    }
    const announcement = yield announcRepository.findOneBy({
        id: announcementId,
    });
    if (!announcement) {
        throw new appError_1.AppError(404, "Announcement not found");
    }
    const comment = new Comments_entity_1.Comment();
    comment.description = description;
    comment.announcement = announcement;
    comment.user = user;
    const newComment = yield commentsRepository.save(comment);
    const desconstruct = () => {
        const { id, description, createdAt } = newComment, rest = __rest(newComment, ["id", "description", "createdAt"]);
        return { id, description, createdAt };
    };
    return desconstruct();
});
exports.default = createCommentService;
