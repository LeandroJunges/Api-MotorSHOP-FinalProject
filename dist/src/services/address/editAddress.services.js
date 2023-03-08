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
const Address_entity_1 = require("../../entities/Address.entity");
const User_entity_1 = require("../../entities/User.entity");
const appError_1 = require("../../errors/appError");
const editAddressService = ({ cep, city, complement, number, state, street }, id) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = data_source_1.default.getRepository(User_entity_1.User);
    const addressRepository = data_source_1.default.getRepository(Address_entity_1.Address);
    // const findAddress = addressRepository.findOne({
    //     where: {
    // })
    const findUser = yield userRepository.findOneBy({
        id
    });
    const addressId = findUser === null || findUser === void 0 ? void 0 : findUser.address.id;
    if (!findUser) {
        throw new appError_1.AppError(404, "User not found!");
    }
    yield addressRepository.update(addressId, {
        cep: cep ? cep : findUser.address.cep,
        city: city ? city : findUser.address.city,
        complement: complement ? complement : findUser.address.complement,
        number: number ? number : findUser.address.number,
        state: state ? state : findUser.address.state,
        street: street ? street : findUser.address.street
    });
    const user = yield userRepository.findOneBy({
        id
    });
    return user;
});
exports.default = editAddressService;
