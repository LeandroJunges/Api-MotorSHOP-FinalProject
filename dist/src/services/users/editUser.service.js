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
exports.editUserService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const User_entity_1 = require("../../entities/User.entity");
const appError_1 = require("../../errors/appError");
const bcrypt_1 = __importDefault(require("bcrypt"));
const editUserService = (id, req, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepository = data_source_1.default.getRepository(User_entity_1.User);
    const userFind = yield usersRepository.findOneBy({
        id: id,
    });
    if (!userFind) {
        throw new appError_1.AppError(404, "User don't exists");
    }
    // if (userId !== id) {
    //   throw new AppError(403, "User can only edit himself");
    // }
    if (req.hasOwnProperty("isActive")) {
        throw new appError_1.AppError(403, "You can't soft delete user in this route");
    }
    if (req.email) {
        const userFind = yield usersRepository.findOneBy({
            email: req.email,
        });
        if (userFind) {
            throw new appError_1.AppError(400, "E-mail is already being used");
        }
    }
    if (req.cellphone) {
        const userFind = yield usersRepository.findOneBy({
            cellphone: req.cellphone,
        });
        if (userFind) {
            throw new appError_1.AppError(400, "Cellphone is already being used");
        }
    }
    if (req.cpf) {
        const userFind = yield usersRepository.findOneBy({
            cpf: req.cpf,
        });
        if (userFind) {
            throw new appError_1.AppError(400, "Cpf is already being used");
        }
    }
    const hashedPassword = req.password && bcrypt_1.default.hashSync(req.password, 10);
    yield usersRepository.update(id, Object.assign(Object.assign({}, req), { password: hashedPassword }));
    const userUpdated = yield usersRepository.findOneBy({
        id: id,
    });
    const _a = userUpdated, { password } = _a, rest = __rest(_a, ["password"]);
    return Object.assign(Object.assign({}, rest), req);
});
exports.editUserService = editUserService;
exports.default = exports.editUserService;
