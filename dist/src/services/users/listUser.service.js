"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../data-source"));
const User_entity_1 = require("../../entities/User.entity");
const appError_1 = require("../../errors/appError");
const listUserService = (userId) => {
    const usersRepository = data_source_1.default.getRepository(User_entity_1.User);
    const user = usersRepository.findOneBy({
        id: userId,
    });
    if (!user) {
        throw new appError_1.AppError(404, "User not found");
    }
    return user;
};
exports.default = listUserService;
