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
exports.editCommentService = void 0;
const data_source_1 = __importDefault(require("../../data-source"));
const Comments_entity_1 = require("../../entities/Comments.entity");
const User_entity_1 = require("../../entities/User.entity");
const appError_1 = require("../../errors/appError");
const editCommentService = (id, description, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    //   console.log("AAQUII", id, description, commentId);
    const usersRepository = data_source_1.default.getRepository(User_entity_1.User);
    const commentsRepository = data_source_1.default.getRepository(Comments_entity_1.Comment);
    const user = yield usersRepository.findOneBy({
        id: id,
    });
    const comment = yield commentsRepository.findOneBy({
        id: commentId,
    });
    if (!comment) {
        throw new appError_1.AppError(404, "Comment not found");
    }
    if (comment.user.id !== id) {
        throw new appError_1.AppError(403, "Not allowed to edit this comment");
    }
    yield commentsRepository.update(comment.id, { description: description });
    const commentUpdated = yield commentsRepository.findOneBy({
        id: comment.id,
    });
    const desconstruct = () => {
        const _a = commentUpdated, { id, description, createdAt } = _a, rest = __rest(_a, ["id", "description", "createdAt"]);
        return { id, description, createdAt };
    };
    return desconstruct();
});
exports.editCommentService = editCommentService;
exports.default = exports.editCommentService;
