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
const data_source_1 = require("../../data-source");
const User_entity_1 = require("../../entities/User.entity");
const appError_1 = require("../../errors/appError");
const Comments_entity_1 = require("../../entities/Comments.entity");
const deleteCommentService = (id, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRepository = data_source_1.AppDataSource.getRepository(User_entity_1.User);
    const commentsRepository = data_source_1.AppDataSource.getRepository(Comments_entity_1.Comment);
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
        throw new appError_1.AppError(403, "Not allowed to delete this comment");
    }
    const commentDeleted = yield commentsRepository.delete(comment.id);
    return commentDeleted;
});
exports.default = deleteCommentService;
