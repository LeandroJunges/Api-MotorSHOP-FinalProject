"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const editAddress_controller_1 = __importDefault(require("../controllers/address/editAddress.controller"));
const verifyAuth_middleware_1 = __importDefault(require("../middlewares/verifyAuth.middleware"));
const addressRoutes = (app) => {
    app.patch("/address", verifyAuth_middleware_1.default, editAddress_controller_1.default);
};
exports.default = addressRoutes;
