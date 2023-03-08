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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const Announcement_entity_1 = require("../../entities/Announcement.entity");
const appError_1 = require("../../errors/appError");
const deleteAnnouncementService = (adId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const announcementRepository = data_source_1.default.getRepository(Announcement_entity_1.Announcement);
    let announcement = yield announcementRepository.findOneBy({ id: adId });
    if (!announcement || announcement.user.id !== userId) {
        throw new appError_1.AppError(404, "Announcement not found");
    }
    yield announcementRepository.delete({ id: adId });
    return;
});
exports.default = deleteAnnouncementService;
