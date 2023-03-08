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
const data_source_1 = require("../../data-source");
const User_entity_1 = require("../../entities/User.entity");
const appError_1 = require("../../errors/appError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_util_1 = require("../../utils/nodemailer.util");
const userPassRecoveryService = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
    if (!email) {
        throw new appError_1.AppError(400, "Field email is required");
    }
    const user = yield usersRepository.findOneBy({ email });
    if (!user) {
        return {
            message: "If there is an account with that email, a link will be sent",
        };
    }
    const passToken = jsonwebtoken_1.default.sign({
        id: user.id,
        email: email,
    }, process.env.SECRET_KEY, { expiresIn: "3h" });
    yield (0, nodemailer_util_1.sendEmail)({
        subject: "Recuperação de senha | Motors Shop",
        text: `Use este link para recuperar sua senha: http://localhost:5173/recovery/auth?token=${passToken}. Válido por 3 horas`,
        to: email,
    });
    return {
        message: "If there is an account with that email, a link will be sent",
    };
});
exports.default = userPassRecoveryService;
