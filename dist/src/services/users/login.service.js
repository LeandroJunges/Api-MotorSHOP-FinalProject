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
const User_entity_1 = require("../../entities/User.entity");
const data_source_1 = require("../../data-source");
const appError_1 = require("../../errors/appError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const loginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
    const userFind = yield usersRepository.findOneBy({
        email: email,
    });
    if (!userFind) {
        throw new appError_1.AppError(403, "Incorrect email or password");
    }
    const passwordMatch = yield bcrypt_1.default.compare(password, userFind.password);
    if (!passwordMatch) {
        throw new appError_1.AppError(403, "Incorrect email or password");
    }
    if (userFind.isActive === false) {
        yield usersRepository.update(userFind.id, { isActive: true });
    }
    const token = jsonwebtoken_1.default.sign({
        id: userFind.id,
        email: userFind.email,
        isAdvertiser: userFind.isAdvertiser,
    }, process.env.SECRET_KEY, { expiresIn: "24h" });
    const user = yield usersRepository.findOne({
        where: { email: email },
    });
    return { user, token };
});
exports.default = loginService;
