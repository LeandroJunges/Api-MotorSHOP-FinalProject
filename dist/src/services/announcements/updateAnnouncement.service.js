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
const Image_entity_1 = require("../../entities/Image.entity");
const appError_1 = require("../../errors/appError");
const updateAnnouncementService = (data, adId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const imagesRepository = data_source_1.default.getRepository(Image_entity_1.Image);
    const announcementsRepository = data_source_1.default.getRepository(Announcement_entity_1.Announcement);
    const handleImage = (link, annId) => __awaiter(void 0, void 0, void 0, function* () {
        const annFound = yield announcementsRepository.findOneBy({ id: annId });
        const newImg = new Image_entity_1.Image();
        newImg.link = link;
        newImg.announcement = annFound;
        yield imagesRepository.save(newImg);
    });
    const { imgs } = data, rest = __rest(data, ["imgs"]);
    const newData = Object.assign({}, rest);
    if (Object.keys(data).length < 1) {
        throw new appError_1.AppError(409, "You need to pass at least one argument to update");
    }
    const announcement = yield announcementsRepository.findOneBy({ id: adId });
    if (!announcement || announcement.user.id !== userId) {
        throw new appError_1.AppError(404, "Announcement not found");
    }
    if (data.isAuction !== undefined) {
        if (data.isAuction === false && announcement.isAuction === true) {
            if (data.price === undefined) {
                throw new appError_1.AppError(403, "To turn an auction into a normal sell, must change 'initialBid' to 'price' keys");
            }
            if (data.initialBid) {
                throw new appError_1.AppError(403, "To turn an auction into a normal sell, must change 'initialBid' to 'price' keys");
            }
            //AQUII
            if (imgs) {
                const imagesFound = yield imagesRepository.find({
                    where: {
                        announcement: {
                            id: adId,
                        },
                    },
                });
                imagesFound.forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
                    yield imagesRepository.delete(e);
                }));
                let img;
                for (img in imgs) {
                    yield handleImage(imgs[img], adId);
                }
            }
            yield announcementsRepository.update({ id: adId }, newData);
            yield announcementsRepository.update({ id: adId }, { initialBid: 0 });
            yield announcementsRepository.update({ id: adId }, { actualBid: 0 });
            const updatedAnnouncement = yield announcementsRepository.findOneBy({
                id: adId,
            });
            return updatedAnnouncement;
        }
        if (data.isAuction === true && announcement.isAuction === false) {
            if (data.initialBid === undefined) {
                throw new appError_1.AppError(403, "To turn a announcement into an auction, must change 'price' to 'initialBid' key");
            }
            if (data.price) {
                throw new appError_1.AppError(403, "To turn a announcement into an auction, must change 'price' to 'initialBid' key");
            }
            //AQUII
            if (imgs) {
                const imagesFound = yield imagesRepository.find({
                    where: {
                        announcement: {
                            id: adId,
                        },
                    },
                });
                imagesFound.forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
                    yield imagesRepository.delete(e);
                }));
                let img;
                for (img in imgs) {
                    yield handleImage(imgs[img], adId);
                }
            }
            yield announcementsRepository.update({ id: adId }, newData);
            yield announcementsRepository.update({ id: adId }, { price: 0 });
            const updatedAnnouncement = yield announcementsRepository.findOneBy({
                id: adId,
            });
            return updatedAnnouncement;
        }
    }
    if (announcement.isAuction === true) {
        if (data.price) {
            throw new appError_1.AppError(403, "Can't set price while announcement is an auction");
        }
    }
    if (announcement.isAuction === false) {
        if (data.initialBid) {
            throw new appError_1.AppError(403, "Can't set initialBid while announcement is a normal sell");
        }
    }
    //AQUII
    if (imgs) {
        const imagesFound = yield imagesRepository.find({
            where: {
                announcement: {
                    id: adId,
                },
            },
        });
        imagesFound.forEach((e) => __awaiter(void 0, void 0, void 0, function* () {
            yield imagesRepository.delete(e);
        }));
        let img;
        for (img in imgs) {
            yield handleImage(imgs[img], adId);
        }
    }
    yield announcementsRepository.update({ id: adId }, newData);
    const updatedAnnouncement = yield announcementsRepository.findOneBy({
        id: adId,
    });
    return updatedAnnouncement;
});
exports.default = updateAnnouncementService;
