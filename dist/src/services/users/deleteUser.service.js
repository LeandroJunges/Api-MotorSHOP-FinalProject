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
exports.deleteUserService = void 0;
const data_source_1 = require("../../data-source");
const User_entity_1 = require("../../entities/User.entity");
const appError_1 = require("../../errors/appError");
const deleteUserService = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
    const userFind = yield usersRepository.findOneBy({
        id: userId,
    });
    if (!userFind) {
        throw new appError_1.AppError(404, "User don't exists");
    }
    if (userId !== id) {
        throw new appError_1.AppError(403, "User can only delete himself");
    }
    // if (userFind.isActive === false) {
    //   throw new AppError(403, "User's aready soft deleted");
    // }
    // await usersRepository.update(id, { isActive: false });
    // const userUpdated = await usersRepository.findOneBy({
    //   id: userId,
    // });
    // const { password, ...rest } = userUpdated!;
    yield usersRepository.delete({
        id: userId,
    });
    return { message: "User deleted" };
});
exports.deleteUserService = deleteUserService;
exports.default = exports.deleteUserService;
