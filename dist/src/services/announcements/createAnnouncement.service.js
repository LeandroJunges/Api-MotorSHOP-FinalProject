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
const Image_entity_1 = require("../../entities/Image.entity");
const User_entity_1 = require("../../entities/User.entity");
const appError_1 = require("../../errors/appError");
const createAnnoucementeService = (userId, data, images) => __awaiter(void 0, void 0, void 0, function* () {
    const announcementRepository = data_source_1.AppDataSource.getRepository(Announcement_entity_1.Announcement);
    const userRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
    const imagesRepository = data_source_1.AppDataSource.getRepository(Image_entity_1.Image);
    const user = yield userRepository.findOneBy({ id: userId });
    if (!user) {
        throw new appError_1.AppError(404, "User not found");
    }
    if (!user.isAdvertiser) {
        throw new appError_1.AppError(401, "Not allowed, change account to seller type");
    }
    const { description, imgMain, isAuction, mileage, price, title, vehicleType, initialBid, year, isSold, } = data;
    if (isAuction === undefined) {
        throw new appError_1.AppError(400, "Sell type field required");
    }
    if (isAuction === true) {
        if (!(description &&
            imgMain &&
            mileage &&
            initialBid &&
            title &&
            vehicleType &&
            year)) {
            throw new appError_1.AppError(400, "All required field must be filled, if sell type is auction, initialBid is required");
        }
        if (price) {
            throw new appError_1.AppError(400, "No need for price in sell type auction");
        }
        const announcement = new Announcement_entity_1.Announcement();
        const newAnnouncement = yield announcementRepository.save(Object.assign(Object.assign({}, announcement), { isAuction: true, vehicleType: vehicleType, title: title, mileage: mileage, description: description, initialBid: initialBid, year: year, imgMain: imgMain, user: user, isSold: false }));
        if (images) {
            const rightImg = [];
            if (Object.keys(images).length > 6) {
                throw new appError_1.AppError(403, "Max of six images addable");
            }
            let image;
            for (image in images) {
                const found = rightImg.find((e) => e === images[image]);
                if (found) {
                    throw new appError_1.AppError(400, "Not able to put duplicate images in announcement");
                }
                else {
                    rightImg.push(images[image]);
                }
            }
            for (image in images) {
                const newImg = new Image_entity_1.Image();
                newImg.link = images[image];
                newImg.announcement = newAnnouncement;
                yield imagesRepository.save(newImg);
            }
        }
        const annReturn = yield announcementRepository.findOneBy({
            id: newAnnouncement.id,
        });
        return annReturn;
    }
    if (!(description &&
        imgMain &&
        mileage &&
        price &&
        title &&
        vehicleType &&
        year)) {
        throw new appError_1.AppError(400, "All required field must be filled, if sell type is not auction, price is required");
    }
    if (initialBid) {
        throw new appError_1.AppError(400, "No need for price in sell type auction");
    }
    const announcement = new Announcement_entity_1.Announcement();
    const newAnnouncement = yield announcementRepository.save(Object.assign(Object.assign({}, announcement), { isAuction: false, vehicleType: vehicleType, title: title, mileage: mileage, description: description, price: price, year: year, imgMain: imgMain, user: user, isSold: false }));
    if (images) {
        const rightImg = [];
        if (Object.keys(images).length > 6) {
            throw new appError_1.AppError(403, "Max of six images addable");
        }
        let image;
        for (image in images) {
            const found = rightImg.find((e) => e === images[image]);
            if (found) {
                throw new appError_1.AppError(400, "Not able to put duplicate images in announcement");
            }
            else {
                rightImg.push(images[image]);
            }
        }
        for (image in images) {
            const newImg = new Image_entity_1.Image();
            newImg.link = images[image];
            newImg.announcement = newAnnouncement;
            yield imagesRepository.save(newImg);
        }
    }
    const annReturn = yield announcementRepository.findOneBy({
        id: newAnnouncement.id,
    });
    return annReturn;
});
exports.default = createAnnoucementeService;
