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
const User_entity_1 = require("../../entities/User.entity");
const appError_1 = require("../../errors/appError");
const bcrypt_1 = require("bcrypt");
const Address_entity_1 = require("../../entities/Address.entity");
const createUserService = ({ name, email, cpf, cellphone, password, description, dateOfBirth, isAdvertiser, cep, state, city, street, number, complement, img, }) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepository = data_source_1.default.getRepository(User_entity_1.User);
    const addressRepository = data_source_1.default.getRepository(Address_entity_1.Address);
    if (!(name &&
        email &&
        password &&
        cpf &&
        description &&
        dateOfBirth &&
        cep &&
        state &&
        city &&
        cellphone &&
        street &&
        number &&
        img)) {
        throw new appError_1.AppError(400, "All required fields must be filled");
    }
    const emailAlreadyExists = yield usersRepository.findOne({
        where: { email: email },
    });
    const cpfAlreadyExists = yield usersRepository.findOne({
        where: { cpf: cpf },
    });
    const cellphoneAlreadyExists = yield usersRepository.findOne({
        where: { cellphone: cellphone },
    });
    let errors = {};
    if (emailAlreadyExists) {
        errors["email"] = "E-mail is already being used";
    }
    if (cpfAlreadyExists) {
        errors["cpf"] = "CPF is already being used";
    }
    if (cellphoneAlreadyExists) {
        errors["cellphone"] = "CellPhone is already being used";
    }
    if (emailAlreadyExists || cpfAlreadyExists || cellphoneAlreadyExists) {
        throw new appError_1.AppError(400, errors);
    }
    const user = new User_entity_1.User();
    const address = new Address_entity_1.Address();
    user.name = name;
    user.email = email;
    user.cpf = cpf;
    user.cellphone = cellphone;
    user.password = yield (0, bcrypt_1.hash)(password, 10);
    user.description = description;
    user.dateOfBirth = dateOfBirth;
    if (img) {
        user.img = img;
    }
    user.isActive = true;
    isAdvertiser
        ? (user.isAdvertiser = isAdvertiser)
        : (user.isAdvertiser = false);
    address.cep = cep;
    address.state = state;
    address.city = city;
    address.street = street;
    address.number = number;
    complement ? (address.complement = complement) : null;
    user.address = address;
    yield addressRepository.save(address);
    const newUser = yield usersRepository.save(user);
    return newUser;
});
exports.default = createUserService;
