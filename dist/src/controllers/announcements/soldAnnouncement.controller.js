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
const soldAnnouncement_service_1 = __importDefault(require("../../services/announcements/soldAnnouncement.service"));
const soldAnnouncementController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const adId = req.params.announcementId;
    const userId = req.user.id;
    const soldAnnoucement = yield (0, soldAnnouncement_service_1.default)(adId, userId);
    return res.json(soldAnnoucement);
});
exports.default = soldAnnouncementController;
