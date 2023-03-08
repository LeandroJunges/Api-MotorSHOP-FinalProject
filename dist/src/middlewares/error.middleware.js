"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../errors/appError");
const errorMiddleWare = (error, req, res, _) => {
    if (error instanceof appError_1.AppError) {
        return res
            .status(error.statusCode)
            .json({ code: error.statusCode, message: error.message });
    }
    return res
        .status(500)
        .json({ message: "Internal Server Error", details: error.message });
};
exports.default = errorMiddleWare;
