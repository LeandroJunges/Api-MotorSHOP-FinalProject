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
exports.listOneAnnouncementController = void 0;
const class_transformer_1 = require("class-transformer");
const listOneAnnounc_service_1 = __importDefault(require("../../services/announcements/listOneAnnounc.service"));
const listOneAnnouncementController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { announcementId } = req.params;
    const announcement = yield (0, listOneAnnounc_service_1.default)(announcementId);
    return res.status(200).json((0, class_transformer_1.instanceToPlain)(announcement));
});
exports.listOneAnnouncementController = listOneAnnouncementController;
