"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const outputFIle = "./src/swagger/swagger_output.json";
const endpoitsFiles = [
    "./src/routes/users.routes.ts",
    "./src/routes/announcements.routes.ts",
    "./src/routes/comments.routes.ts",
    "./src/routes/bids.routes.ts",
    "./src/routes/address.routes.ts",
];
(0, swagger_autogen_1.default)(outputFIle, endpoitsFiles);
